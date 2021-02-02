<?php 
header('Content-type:application/json;charset=utf-8');
include 'db.php';
include 'functions.php';

$input = file_get_contents('php://input');

$userStats = [
    'sudokusSolved' => 0,
    'leastMoves' => 0,
    'cleanGames' => 0,
    'bestTime' => [
        'inSeconds' => 0,
        'formated' => '0h 0m 0s',
    ],
    'level' => 'Novice',
    'xpPoints' => 0,
    'playedDiff' => [],
    'overallDifficulty'  => 'None',
];

$sql =[
    'signup'=> "INSERT INTO profiles (email, password, stats, token) VALUES (?, ?, ?, ?)",
    'checkEmail'=> "SELECT email FROM profiles WHERE email=?",
    'auth' => "SELECT password, stats, save FROM profiles WHERE email=?",
    'token' => "UPDATE profiles SET token=? WHERE email=?",
    'updateStats' => "UPDATE profiles SET stats=? WHERE token=?",
    'logout' => "UPDATE profiles SET token = DEFAULT WHERE token=?",
    'save' => "UPDATE profiles SET save=? WHERE token=?",
    'clearSave' =>  "UPDATE profiles SET save = DEFAULT WHERE token=?"
];

if($input) {
    $data = json_decode($input, true);
    $email= $data['email'] ?? null;
  
    switch ($data['action']) {
        case 'signup':
            $checkEmail = prepare_statement($sql['checkEmail'], 's', $email);
            $checkEmail->store_result();
            if($checkEmail->num_rows > 0) {
                error('Email already in use');
            }else {
                $checkEmail->close();
                $password = password_hash($data['password'], PASSWORD_DEFAULT);
                $token = generate_token();
                $signUp = prepare_statement($sql['signup'], 'ssss', $email, $password, serialize($userStats), $token);
                success('Profile created successfully', ['user' => $email,'overalStats'=> $userStats, 'token'=>$token]);
            }
            break;
        case 'login':
            $login = prepare_statement($sql['auth'], 's', $email);
            $login->store_result();
            if($login->num_rows === 0) {
                error('Invalid Email');
            }
            $password = $data['password'];
            $login->bind_result($passwordHash, $stats, $save);
            $login->fetch();
            if(password_verify($password, $passwordHash)) { 
                $token = generate_token();
                $updateToken = prepare_statement($sql['token'], 'ss', $token, $email);
                success('Login successfull', ['user' => $email,'overalStats'=>  unserialize($stats), 'token'=>$token, 'save'=>unserialize($save)]);
            }else {
                error('Invalid password');
            }
            break;
        case 'statsUpdate':
            $update = prepare_statement($sql['updateStats'], 'ss', serialize($data['overalStats']), $data['token']);
            success('Stats updated');
            break;
        case 'logout':
            $logout = prepare_statement($sql['logout'], 's', $data['token']);
            success('Logout successfull');
             break;
        case 'save':
            $save = prepare_statement($sql['save'], 'ss',  serialize($data['save']), $data['token']);
            success('Game saved');
            break;
        case 'clearSave':
            $save = prepare_statement($sql['clearSave'], 's', $data['token']);
            success('Save deleted');
            break;   
    }
}else{
    error('No valid email or password was given');
}

?>
