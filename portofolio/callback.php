<?php
$client_id = 'Ov23lispRhkTm6D0sx2V';
$client_secret = 'c3561be18a4871ab06f6f7e5ae4c88836cd26e59';

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Current URL: " . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]<br>";

if (isset($_GET['code'])) {
    $code = $_GET['code'];
    echo "Received code: " . htmlspecialchars($code) . "<br>";
    
    $token_url = 'https://github.com/login/oauth/access_token';
    
    $ch = curl_init($token_url);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'code' => $code
    ]));
    
    $response = curl_exec($ch);
    if(curl_errno($ch)) {
        echo 'cURL error: ' . curl_error($ch);
        exit;
    }
    
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (isset($data['access_token'])) {
        ?>
        <script>
            localStorage.setItem('github_token', '<?php echo $data['access_token']; ?>');
            window.location.href = '/portofolio/';
        </script>
        <?php
    } else {
        echo 'Authentication failed: ';
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }
} else {
    echo 'No code parameter received';
}
?>
