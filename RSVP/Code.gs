const INVITATION_CODES = Object.freeze({
	mrti: "N8IFW6",
	rripro2bjm: "0JNDoK",
	abdipersada: "EO4BSC",
	nirwanafmbjb: "gyRr2b",
	disbudporapar: "wB7cDt",
	smekmamedia: "9lJ0Ro",
	smekma: "9jDDOU",
	zainalilmi: "v1qITb",
	alma: "E4YazR",
	ahmadzulfiannur: "qSCaqU",
	mfadli: "pY8lsK",
	arko: "CW5d18",
	bimadwisatriya: "UJV8wp",
	nagaintanbanjar: "kOFykC",
	gazalirumi: "PGb7jY",
	ferdigutak: "XCgfrU",
	arsyadindradi: "X5fNfh",
	rohitrendra: "VEyPZg",
	novitsarinuarbijk: "ww4Okz",
	rinaddbasrindu: "IfgNj6",
	ipulhary: "Gr0Rrh",
	kholismabruri: "xbNt2F",
	mamaela: "JwZN66",
	ferdihidayat: "jZwZ5z",
	ramadhanyabdillah: "NjOnnV",
	greendesignapparel: "lOyeLe",
	nursharfinasaraya: "rTN9g7"
});

const REQUIRED_HEADERS = [
	"ID Undangan",
	"Kode Tautan",
	"Nama Penerima",
	"Instansi/Perusahaan",
	"Jumlah Kursi",
	"Status Kehadiran",
	"Jumlah Hadir",
	"Waktu Konfirmasi"
];

function setupSpreadsheet() {
	const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	if (!spreadsheet) {
		throw new Error("Buka Apps Script dari menu Extensions pada spreadsheet undangan.");
	}

	const sheet = spreadsheet.getSheets()[0];
	const columns = getColumns_(sheet);
	const lastRow = sheet.getLastRow();
	const rows = lastRow > 1
		? sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getDisplayValues()
		: [];
	const seenIds = new Set();
	const seenCodes = new Set();
	const foundIds = new Set();

	rows.forEach((row, index) => {
		const id = String(row[columns.id - 1]).trim();
		if (!id) return;
		if (seenIds.has(id)) throw new Error("ID Undangan duplikat: " + id);
		seenIds.add(id);

		const expectedCode = INVITATION_CODES[id];
		if (!expectedCode) throw new Error("ID Undangan tidak dikenal di daftar kode: " + id);
		foundIds.add(id);

		const currentCode = String(row[columns.code - 1]).trim();
		if (currentCode && currentCode !== expectedCode) {
			throw new Error("Kode Tautan untuk " + id + " sudah terisi berbeda. Periksa spreadsheet sebelum melanjutkan.");
		}
		if (seenCodes.has(expectedCode)) throw new Error("Ada Kode Tautan duplikat.");
		seenCodes.add(expectedCode);
	});

	const missingIds = Object.keys(INVITATION_CODES).filter(id => !foundIds.has(id));
	if (missingIds.length) {
		throw new Error("ID berikut belum ada di spreadsheet: " + missingIds.join(", "));
	}

	rows.forEach((row, index) => {
		const id = String(row[columns.id - 1]).trim();
		if (id && !String(row[columns.code - 1]).trim()) {
			sheet.getRange(index + 2, columns.code).setValue(INVITATION_CODES[id]);
		}
	});

	PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", spreadsheet.getId());
	return "Spreadsheet siap. Kode tautan sudah diisi atau diverifikasi.";
}

function doGet(event) {
	const callback = String(event.parameter.callback || "");
	if (!/^[A-Za-z_$][A-Za-z0-9_$]{0,80}$/.test(callback)) {
		return ContentService.createTextOutput("Invalid callback")
			.setMimeType(ContentService.MimeType.TEXT);
	}

	let result;
	try {
		if (event.parameter.action !== "lookup") throw new Error("Permintaan tidak valid.");
		const record = findInvitation_(event.parameter.id, event.parameter.code);
		if (!record) throw new Error("Tautan undangan tidak valid.");
		result = {
			ok: true,
			invitation: {
				name: record.name,
				organization: record.organization,
				seats: record.seats,
				attendance: record.attendance
			}
		};
	} catch (error) {
		result = { ok: false, message: error.message };
	}

	const safeResult = JSON.stringify(result).replace(/</g, "\\u003c");
	return ContentService.createTextOutput(callback + "(" + safeResult + ");")
		.setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(event) {
	const params = event.parameter || {};
	const requestId = String(params.request_id || "");
	try {
		if (params.action !== "rsvp") throw new Error("Permintaan konfirmasi tidak valid.");
		if (params.attendance !== "akan hadir" && params.attendance !== "belum dapat hadir") {
			throw new Error("Pilihan kehadiran tidak valid.");
		}

		const lock = LockService.getScriptLock();
		lock.waitLock(10000);
		let result;
		try {
			const spreadsheet = getSpreadsheet_();
			const sheet = spreadsheet.getSheets()[0];
			const record = findInvitation_(params.id, params.code, sheet);
			if (!record) throw new Error("Tautan undangan tidak valid.");

			const attendance = params.attendance === "akan hadir" ? "Hadir" : "Tidak hadir";
			const confirmedAt = new Date();
			sheet.getRange(record.row, record.columns.status).setValue(attendance);
			sheet.getRange(record.row, record.columns.confirmedAt)
				.setValue(confirmedAt)
				.setNumberFormat("dd/MM/yyyy HH:mm:ss");
			result = {
				type: "mg-rsvp-result",
				requestId: requestId,
				ok: true,
				attendance: attendance
			};
		} finally {
			lock.releaseLock();
		}
		return postMessageResponse_(result);
	} catch (error) {
		console.error("RSVP save failed: " + error.message);
		return postMessageResponse_({
			type: "mg-rsvp-result",
			requestId: requestId,
			ok: false,
			message: error.message
		});
	}
}

function getSpreadsheet_() {
	const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
	if (!id) throw new Error("Apps Script belum dihubungkan ke spreadsheet. Jalankan setupSpreadsheet().");
	return SpreadsheetApp.openById(id);
}

function getColumns_(sheet) {
	const lastColumn = sheet.getLastColumn();
	if (lastColumn < REQUIRED_HEADERS.length) throw new Error("Header spreadsheet belum lengkap.");
	const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
	const columns = {};
	REQUIRED_HEADERS.forEach(header => {
		const index = headers.indexOf(header);
		if (index < 0) throw new Error("Kolom tidak ditemukan: " + header);
		const key = ({
			"ID Undangan": "id",
			"Kode Tautan": "code",
			"Nama Penerima": "name",
			"Instansi/Perusahaan": "organization",
			"Jumlah Kursi": "seats",
			"Status Kehadiran": "status",
			"Jumlah Hadir": "attendees",
			"Waktu Konfirmasi": "confirmedAt"
		})[header];
		columns[key] = index + 1;
	});
	return columns;
}

function findInvitation_(id, code, existingSheet) {
	id = String(id || "").trim();
	code = String(code || "").trim();
	if (!/^[a-z0-9-]{1,60}$/i.test(id) || !/^[A-Za-z0-9]{6}$/.test(code)) return null;

	const spreadsheet = existingSheet ? null : getSpreadsheet_();
	const sheet = existingSheet || spreadsheet.getSheets()[0];
	const columns = getColumns_(sheet);
	const lastRow = sheet.getLastRow();
	if (lastRow < 2) return null;
	const rows = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getDisplayValues();
	for (let index = 0; index < rows.length; index++) {
		const row = rows[index];
		if (String(row[columns.id - 1]).trim() === id
			&& String(row[columns.code - 1]).trim() === code) {
			return {
				row: index + 2,
				columns: columns,
				name: String(row[columns.name - 1]).trim(),
				organization: String(row[columns.organization - 1]).trim(),
				seats: Number(row[columns.seats - 1]) || 0,
				attendance: String(row[columns.status - 1]).trim()
			};
		}
	}
	return null;
}

function postMessageResponse_(payload) {
	const safePayload = JSON.stringify(payload).replace(/</g, "\\u003c");
	return HtmlService.createHtmlOutput(
		"<!doctype html><meta charset=\"utf-8\"><script>window.top.postMessage("
		+ safePayload + ", \"*\");</script>"
	).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
