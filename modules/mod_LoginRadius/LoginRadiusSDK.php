<?php 
class LoginRadiusAuth{
  public $IsAuth,$JsonResponse,$UserAuth; 
  public function auth($ApiKey, $ApiSecrete, $ApiCred){
  $IsAuth = false;
  if (isset($ApiKey)){
    $ApiKey = trim($ApiKey);
    $ApiSecrete= trim($ApiSecrete);
    $ValidateUrl = "https://hub.loginradius.com/getappinfo/$ApiKey/$ApiSecrete";
    if ($ApiCred == 0) {
      $curl_handle = curl_init();
      curl_setopt($curl_handle, CURLOPT_URL, $ValidateUrl);
      curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 3);
      curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER, false);
      if (ini_get('open_basedir') == '' && (ini_get('safe_mode') == 'Off' or !ini_get('safe_mode'))) {
        curl_setopt($curl_handle, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);
        $JsonResponse = curl_exec($curl_handle);
      }
      else {
        curl_setopt($curl_handle,CURLOPT_HEADER, 1);
        $url = curl_getinfo($curl_handle,CURLINFO_EFFECTIVE_URL);
        curl_close($curl_handle);
        $ch = curl_init();
        $url = str_replace('?','/?',$url);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $JsonResponse = curl_exec($ch);
        curl_close($ch);
      }
      $UserAuth = json_decode($JsonResponse);
    }
    else {
      $JsonResponse = file_get_contents($ValidateUrl);
      $UserAuth = json_decode($JsonResponse);
    }
    if (isset( $UserAuth->IsValid)) { 
      $this->IsAuth = true;
      return $UserAuth;
    }
	else {
	  return false;
	}
   }
 }
}?>