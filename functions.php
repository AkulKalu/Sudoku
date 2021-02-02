<?php
function prepare_statement($sql,$types, ...$args) {
    global $conn;
    if($stm = $conn->prepare($sql)) {
        $stm->bind_param($types, ...$args);
        if(!$stm->execute()) {
            error('Error while creating profile', true);
        }
        return $stm;
    }else {
        error($conn->error, true);
    }
}

function update_token($sql) {
    global $conn;
    if(!$conn->query($sql)) {
        error($conn->error, true);
    };
}

function error($message, $server = false) {
    if($server) {
        http_response_code(500);
    }
    $jsonData = ['error'=> $message];
    exit(json_encode($jsonData));
}
function success($message, $payload=null) {
    $jsonData = ['error'=> false,'message'=> $message,'response'=> $payload];
    exit(json_encode($jsonData));
}

function generate_token($length = 50) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $token = '';
    for ($i = 0; $i < $length; $i++) {
        $token .= $characters[rand(0, $charactersLength - 1)];
    }
    return $token;
}
?>