<?php
if ( isAjax() ) {

	//if atleast, these 2 info available, we can send a mail
	if ( isset($_POST) && !empty($_POST['name']) && !empty($_POST['email']) ) { //Checks if action value exists
	    $name 		= $_POST["name"];
	    $email 		= $_POST["email"];
	    $phone 		= !empty( $_POST["phone"] ) ? $_POST["phone"] : null;
	    $message 	= !empty( $_POST["message"] ) ? $_POST["message"] : null;

	    //prepare and send mail
		$to 	= "amyplant@me.com";
		$subject= "Submission from Eloquent Wedding";
		$headers= "From: {$email}" . "\r\n";
		$txt 	= $message;

		$sent = mail($to,$subject,$txt,$headers);
		if($sent){
			$response = [
				'status' => true,
				'mailSent' => true,
			];
		} else {
			$response = [
				'status' => true,
				'mailSent' => false,
			];
		}

	} else {//when no data has been received
		$response = [
			'status' => false
		];
	}
	//convert data-to-be-sent to json
	$json = json_encode($response);
	//prepare json response header
	header('Content-type: application/json');
	// return json data
	exit($json);

} else{ //when not an ajax request
	die('Oops: direct access not allowed');
}

function isAjax(){
	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
