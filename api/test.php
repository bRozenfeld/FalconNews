<?php
$feed_url = "https://cyware.com/allnews/feed";

$content = file_get_contents($feed_url);

//header('Content-Type: application/rss+xml');
$xml = simplexml_load_string($content);
$json = json_encode($xml);

echo $json;

//exit;
?>
