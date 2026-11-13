<?php
// Endpoint proxy kursi aruhganal.com
// Malamar Gawian Ticket System
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=30');

$cacheFile = __DIR__ . '/seats-cache.json';
$cacheDuration = 45; // Cache 45 detik agar server tidak dibebani tapi tetap update

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheDuration)) {
    echo file_get_contents($cacheFile);
    exit;
}

$filmIds = [13, 14, 15, 16, 17, 18];
$results = [];

$ctx = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)\r\nAccept: text/html\r\n",
        'timeout' => 3
    ]
]);

foreach ($filmIds as $id) {
    $url = "https://aruhganal.com/tiket/film/{$id}";
    $html = @file_get_contents($url, false, $ctx);
    if ($html && preg_match('/Kursi tersisa(?:&nbsp;|\s)+<b>(.*?)<\/b>/i', $html, $matches)) {
        $raw = trim($matches[1]); // Contoh: "218 dari 220"
        if (preg_match('/^(\d+)/', $raw, $sub)) {
            $remaining = (int)$sub[1];
            $results[$id] = [
                'remaining' => $remaining,
                'text' => ($remaining <= 0) ? 'tiket habis' : "sisa {$remaining} kursi",
                'raw' => $raw
            ];
            continue;
        }
    }
    // Fallback bila gagal scrap
    $results[$id] = [
        'remaining' => 220,
        'text' => 'sisa 220 kursi'
    ];
}

$output = json_encode([
    'status' => 'success',
    'timestamp' => time(),
    'data' => $results
], JSON_PRETTY_PRINT);

@file_put_contents($cacheFile, $output);
echo $output;
