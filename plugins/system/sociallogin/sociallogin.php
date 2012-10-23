<?php
defined ('_JEXEC') or die ('Restricted access');
jimport ('joomla.plugin.plugin');
jimport ('joomla.filesystem.file');
jimport ('joomla.user.helper');
jimport ('joomla.mail.helper' );
jimport ('joomla.application.component.helper');
jimport ('joomla.application.component.modelform');
jimport ('joomla.application.component.controller' );
jimport ('joomla.event.dispatcher');
jimport ('joomla.plugin.helper');
jimport ('joomla.utilities.date');
// Check if plugin is correctly installed
if (!JFile::exists (dirname (__FILE__) . DS . 'LoginRadius.php')) {
  JError::raiseNotice ('sociallogin_plugin', JText::_ ('MOD_LOGINRADIUS_INSTALL_CUSTOM_INSTALL_FAILURE'));
  return;
}
require_once(dirname (__FILE__) . DS . 'LoginRadius.php');
class plgSystemSocialLogin extends JPlugin {
  function plgSystemSocialLogin(&$subject, $config) {
    parent::__construct($subject,$config);
  }
  function onAfterInitialise() {
  $lrdata = array(); $user_id = ''; $id = ''; $email = ''; $msg = ''; $defaultUserGroup = '';
	// Get module configration option value
	$mainframe = JFactory::getApplication();
	$user = JFactory::getUser(0);
	$db =& JFactory::getDBO();
	$config = JFactory::getConfig();
    $language =& JFactory::getLanguage();
	$session =& JFactory::getSession();
	$language->load('com_users');
	JPlugin::loadLanguage('plg_system_sociallogin');
	$authorize = JFactory::getACL();
	// Retrive data from LoginRadius
	$apisecret = $this->params->get('apisecret');
    $obj = new LoginRadius();
    $userprofile = $obj->construct($apisecret);
	if ($obj->IsAuthenticated == true) {
	  if ($session->get('tmpuser')) {
	    $session->clear('tmpuser');
	  }
	  $lrdata = $this->get_userprofile_data($userprofile);
	  if ($this->params->get('dummyemail') == 1 && $lrdata['email'] == "") {
	    //Random email if not true required email
		$lrdata['email'] = $this->get_random_email($lrdata);
      }
	   $query = "SELECT u.id FROM #__users AS u
     INNER JOIN #__LoginRadius_users AS lu ON lu.id = u.id
     WHERE lu.LoginRadius_id = '".$lrdata['id']."' AND u.block = 1";
        $db->setQuery($query);
        $block_id = $db->loadResult();
		if (!empty($block_id) || $block_id) {
		  JError::raiseWarning ('', JText::_ ('PLG_USERS_REGISTRATION_SAVE_FAILED'));
          return false;
		}
	  if ($this->params->get('dummyemail') == 0 && $lrdata['email'] == '') {
	    $usersConfig = JComponentHelper::getParams( 'com_users' );
	    $useractivation = $usersConfig->get( 'useractivation' );
	    $query = "SELECT u.id FROM #__users AS u
     INNER JOIN #__LoginRadius_users AS lu ON lu.id = u.id
     WHERE lu.LoginRadius_id = '".$lrdata['id']."' AND u.block = 0 AND u.activation = '' AND u.sendEmail != '1'";
        $db->setQuery($query);
        $user_id = $db->loadResult();
		$newuser = true;
        if (isset($user_id)) {
		  $user =& JFactory::getUser($user_id);
            if ($user->id == $user_id) {
              $newuser = false;
            }
        }
        else {
		  $msg = JText::_ ('MOD_LOGINRADIUS_EMAILENTER');
		  // Register session variables
          $session->set('tmpuser',$lrdata);
          $this->enterEmailPopup($msg);
         } 
	   }
	}
	if (isset($_POST['sociallogin_emailclick'])) {
	  $lrdata = $session->get('tmpuser');
	  if (isset($_POST['session']) && $_POST['session'] == $lrdata['session'] && !empty($lrdata['session'])) {
        $email = urldecode($_POST['email']);
        if(!JMailHelper::isEmailAddress($email)) {
		   $msg = JText::_ ('MOD_LOGINRADIUS_EMAILINVALID');
           $this->enterEmailPopup($msg);
		   return false;
        }
	    else {
	      $email = $db->getEscaped($email);
	      $query = "SELECT id FROM #__users WHERE email='".$email."' and sendEmail = 1";
			$db->setQuery($query);
			$admin_exist = $db->loadResult();
			if ($admin_exist != 0) {
			  $session->clear('tmpuser');
			  JError::raiseWarning ('', JText::_ ('PLG_USERS_ADMIN_RESTRICT'));
		      return false;
			}
			else {
			  $query = "SELECT id FROM #__users WHERE email='".$email."' AND block = 0";
			  $db->setQuery($query);
			  $user_exist = $db->loadResult();
	          if ($user_exist != 0 ) {
		        $lrdata = $session->get('tmpuser');
		        $id = $lrdata['id'];
		        jimport ('joomla.user.helper');
			    // Load the users plugin group.
		        JPluginHelper::importPlugin('user');
		        $user =& JFactory::getUser($user_exist);
			    $user->set('activation', JUtility::getHash(JUserHelper::genRandomPassword()));
			    $user->set('lastvisitDate', '');
			    $user->set('block', 1);
			    $user->save();
			    $query = "select id from #__LoginRadius_users WHERE id='".$user_exist."'";
                $db->setQuery($query);
		        $set_id = $db->loadResult();
		        if (!$set_id) {
			      //Add
	              $sql = "INSERT INTO #__LoginRadius_users SET id = " . $db->quote ($user_exist) . ",  LoginRadius_id = " . $db->Quote ($id);
			      $db->setQuery ($sql);
			      $db->query();
		        }
		        else {
		          $query = "UPDATE #__LoginRadius_users SET LoginRadius_id='$id' WHERE id='".$user_exist."'";
                  $db->setQuery($query);
		          $db->query();
		        }
	        $usermessgae = 1;
			$this->_sendMail($user, $usermessgae);
		    $session->clear('tmpuser');	
            $mainframe->enqueueMessage (JText::_ ('COM_USERS_REGISTRATION_COMPLETE_ACTIVATE'));	
		    return false;
		
        }
        else {
	      $lrdata = $session->get('tmpuser');
          $email = $db->getEscaped(urldecode($_POST['email']));
          $lrdata['email'] = $email;
	    }
	   }
	  }
	 }
	 else {
	    $session->clear('tmpuser');
	    JError::raiseWarning ('', JText::_ ('PLG_USERS_SESSION_EXPIRED'));
		return false;
	 }
  }
    else if (isset($_POST['cancel'])) {
	   //Redirect after Cancel click.
	    $session->clear('tmpuser');
	    $redirct = JURI::base();
	    $mainframe->redirect($redirct);
	}
	if (isset($lrdata['id']) && !empty($lrdata['id']) && !empty($lrdata['email'])) {
	  if (!empty($lrdata['fname']) && !empty($lrdata['lname'])) {
	    $username = $lrdata['fname'].$lrdata['lname'];
	    $name = $lrdata['fname'];
	  }
	  elseif (!empty($lrdata['FullName'])) {
	    $username = $lrdata['FullName'];
	    $name = $lrdata['FullName'];
	  }
	  elseif (!empty($lrdata['ProfileName'])) {
	    $username = $lrdata['ProfileName'];
	    $name = $lrdata['ProfileName'];
	  }
	  elseif (!empty($lrdata['NickName'])) {
	    $username = $lrdata['NickName'];
	    $name = $lrdata['NickName'];
	  }
	  elseif (!empty($lrdata['email'])) {
	    $user_name = explode('@',$lrdata['email']);
	    $username = $user_name[0];
        $name=str_replace("_"," ",$user_name[0]);
	  }
	  else {
	    $username = $lrdata['id'];
	    $name = $lrdata['id'];
	  }
	  $query="SELECT u.id FROM #__users AS u
     INNER JOIN #__LoginRadius_users AS lu ON lu.id = u.id
     WHERE lu.LoginRadius_id = '".$lrdata['id']."' AND u.block = 0 AND u.activation = ''";
      $db->setQuery($query);
      $user_id = $db->loadResult();
      // if not then check for email exist
	  if (empty($user_id)) {
        $query = "SELECT id FROM #__users WHERE email='".$lrdata['email']."' AND block = 0 AND activation = ''";
        $db->setQuery($query);
        $user_id = $db->loadResult();
      }
	  if (empty($user_id)) {
        $query = "SELECT id FROM #__users WHERE email='".$lrdata['email']."' AND block = 0 AND sendEmail = 1";
        $db->setQuery($query);
        $user_id = $db->loadResult();
      }
      $newuser = true;
      if (isset($user_id)) {
	    $user =& JFactory::getUser($user_id);
        if ($user->id == $user_id) {
          $newuser = false;
        }
	  }
	  if ($newuser == true) {
	    // If user registration is not allowed, show 403 not authorized.
	    $usersConfig = JComponentHelper::getParams( 'com_users' );
        if ($usersConfig->get('allowUserRegistration') == '0') {
          JError::raiseWarning( '', JText::_( 'MOD_LOGINRADIUS_USERS_REGISTRATION'));
          return false;
        }
		// Default to Registered.
        $defaultUserGroup = $usersConfig->get('new_usertype');
	    if (empty($defaultUserGroups)) {
          $defaultUserGroups = 'Registered';
        }
        // if username already exists
        $username = $this->get_exist_username($username);
		
		// Remove special char if have.
		$username = $this->remove_unescapedChar($username);
	    $name = $this->remove_unescapedChar($name);
	    //Insert data 
		jimport ('joomla.user.helper');
	    $userdata = array ();
	    $userdata ['name'] = $db->getEscaped($name);
        $userdata ['username'] = $db->getEscaped($username);
        $userdata ['email'] = $lrdata['email'];
        $userdata ['usertype'] = 'deprecated';
        $userdata ['groups'] = array($defaultUserGroup);
        $userdata ['registerDate'] = JFactory::getDate ()->toMySQL ();
        $userdata ['password'] = JUserHelper::genRandomPassword ();
        $userdata ['password2'] = $userdata ['password'];
		$useractivation = $usersConfig->get( 'useractivation' );
		if ($useractivation == '2') {
		  $userdata ['activation'] = JUtility::getHash(JUserHelper::genRandomPassword());
		  $userdata ['block'] = 1;
		}
		else {
		  $userdata ['activation'] = '';
		  $userdata ['block'] = 0;
		}
		if (!$user->bind ($userdata)) {
          JError::raiseWarning ('', JText::_ ('COM_USERS_REGISTRATION_BIND_FAILED'));
          return false;
        }
        //Save the user
        if (!$user->save()) {
             JError::raiseWarning ('', JText::_ ('PLG_USERS_REGISTRATION_SAVE_FAILED'));
          return false;
        }
		
       $user_id = $user->get ('id');
	   // Save the profile data of user
	   $data = array();
	   $data['profile']['address1'] = $lrdata['address1'];
	   $data['profile']['address2'] = $lrdata['address2'];
	   $data['profile']['city'] = $lrdata['city'];
	   //$data['profile']['country'] = $lrdata['country'];
	   $data['profile']['dob'] = $lrdata['dob'];
	   $data['profile']['aboutme'] = $lrdata['aboutme'];
	   $data['profile']['website'] = $lrdata['website'];
	    //Sanitize the date
	   		if (!empty($data['profile']['dob'])) {
					//$date = new JDate($data['profile']['dob']);
					$date = JFactory::getDate();
					$data['profile']['dob'] = $date->toFormat('%Y-%m-%d');
				}
				else {
				  $data['profile']['dob'] = $data['profile']['dob'];
				}
	            $tuples = array();
				$order	= 1;

				foreach ($data['profile'] as $k => $v) {
					$tuples[] = '('.$user_id.', '.$db->quote('profile.'.$k).', '.$db->quote($v).', '.$order++.')';
				}
                $db->setQuery('INSERT INTO #__user_profiles VALUES '.implode(', ', $tuples));
                $db->query();
         //Add new id to db
		 $sql = "INSERT INTO #__LoginRadius_users SET id = " . $db->quote ($user_id) . ",  LoginRadius_id = " . $db->Quote ($lrdata['id']);
         $db->setQuery ($sql);
	     $db->query();
		
	   // check for the community builder works.
          $query = "SHOW TABLES LIKE '%__comprofiler'";
          $db->setQuery($query);
          $cbtableexists = $db->loadResult();
          if (isset($cbtableexists)) {
		    $this->make_cb_user($lrdata, $user);
          }
		  // check for the k2 works.
          if (JPluginHelper::isEnabled('system', 'k2')) {
		    $this->check_exist_comk2($user_id, $username, $lrdata);
		  }
		  // check for the jom social works.
          $query = "SHOW TABLES LIKE '%__community_users'";
          $db->setQuery($query);
          $jomtableexists = $db->loadResult();
          if (isset($jomtableexists)) {
		    $this->make_jomsocial_user($lrdata, $user);
          }
	    // Handle account activation/confirmation emails.
		if ($useractivation == '2')
		{
		  $usermessgae = 1;
		  $this->_sendMail($user, $usermessgae);
		  $mainframe->enqueueMessage(JText::_ ('COM_USERS_REGISTRATION_COMPLETE_VERIFY'));
		  return false;
		}
		else {
		  $usermessgae = 2;
		  $this->_sendMail($user, $usermessgae);
		}
	  }
	} 
	  if ($user_id) {
	    $user =& JUser::getInstance((int)$user_id);
        // Register session variables
        $session =& JFactory::getSession();
        $session->set('user',$user);
        // Getting the session object
        $table = & JTable::getInstance('session');
        $table->load( $session->getId());
        $table->guest = '0';
        $table->username = $user->get('username');
        $table->userid = intval($user->get('id'));
        $table->usertype = $user->get('usertype');
        $table->gid  = $user->get('gid');
        $table->update();
        $user->setLastVisit();
	    $user =& JFactory::getUser();
		//Redirect after Login
	    $redirct = $this->getReturnURL();
	    $mainframe->redirect($redirct);
		$session->clear('tmpuser');
	  }
    }
	
/*
 * Function that sends a verification link to exist user.
 */
   function _sendMail(&$user, $usermessgae)
	{
	 // Compile the notification mail values.
	        $config = JFactory::getConfig();
		    $data = $user->getProperties();
		    $data['fromname'] = $config->get('fromname');
		    $data['mailfrom'] = $config->get('mailfrom');
		    $data['sitename'] = $config->get('sitename');
		    $data['siteurl'] = JUri::base();
			$uri = JURI::getInstance();
			$base = $uri->toString(array('scheme', 'user', 'pass', 'host', 'port'));
			$data['activate'] = $base.JRoute::_('index.php?option=com_users&task=registration.activate&token='.$data['activation'], false);

			$emailSubject	= JText::sprintf(
				'COM_USERS_EMAIL_ACCOUNT_DETAILS',
				$data['name'],
				$data['sitename']
			);

			if($usermessgae == 1) {
				$emailBody = JText::sprintf('MOD_LOGINRADIUS_SEND_MSG_ACTIVATE',
				$data['name'],
				$data['sitename'],
				$data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'],
				$data['siteurl'],
				$data['username'],
				$data['password_clear']
			   );
			}
			else if($usermessgae == 0){ 
				$emailBody = JText::sprintf('COM_USERS_EMAIL_REGISTERED_WITH_ADMIN_ACTIVATION_BODY',
				$data['name'],
				$data['sitename'],
				$data['siteurl'].'index.php?option=com_users&task=registration.activate&token='.$data['activation'],
				$data['siteurl'],
				$data['username'],
				$data['password_clear']
			    );
		    }
            else if ($usermessgae == 2) {
			   $emailBody = JText::sprintf('PLG_SEND_MSG',
				$data['name'],
				$data['sitename'],
				$data['siteurl'].'index.php',
				$data['siteurl'],
				$data['username'],
				$data['password_clear']
			    );
			}
			
			// Send the registration email.
			$return = JUtility::sendMail($data['mailfrom'], $data['fromname'], $data['email'], $emailSubject, $emailBody);
			// Check for an error.
		if ($return !== true) {
			$this->setError(JText::_('COM_USERS_REGISTRATION_SEND_MAIL_FAILED'));

			// Send a system message to administrators receiving system mails
			$db = JFactory::getDBO();
			$q = "SELECT id
				FROM #__users
				WHERE block = 0
				AND sendEmail = 1";
			$db->setQuery($q);
			$sendEmail = $db->loadResultArray();
			if (count($sendEmail) > 0) {
				$jdate = new JDate();
				// Build the query to add the messages
				$q = "INSERT INTO `#__messages` (`user_id_from`, `user_id_to`, `date_time`, `subject`, `message`)
					VALUES ";
				$messages = array();
				foreach ($sendEmail as $userid) {
					$messages[] = "(".$userid.", ".$userid.", '".$jdate->toMySQL()."', '".JText::_('COM_USERS_MAIL_SEND_FAILURE_SUBJECT')."', '".JText::sprintf('COM_USERS_MAIL_SEND_FAILURE_BODY', $return, $userdata['username'])."')";
				}
				$q .= implode(',', $messages);
				$db->setQuery($q);
				$db->query();
			}
			return false;
		  }
		  if ($this->params->get('sendadminmail') == 1  && $usermessgae == 2) {
			   
			   $db = JFactory::getDBO();
			   // get all admin users
               $query = 'SELECT name, email, sendEmail' . ' FROM #__users' . ' WHERE sendEmail=1';
               $db->setQuery( $query );
               $rows = $db->loadObjectList();
               // Send mail to all superadministrators id
              foreach( $rows as $row ) {
                JUtility::sendMail($data['mailfrom'], $data['fromname'], $row->email, $emailSubject, JText::sprintf('PLG_SEND_MSG_ADMIN',
				$row->name,
				$data['sitename'],
				$data['siteurl'],
				$data['email'],
				$data['username'],
				$data['password_clear']
			    ));
			   }
			 }
	}

/*
 * Function that checks k2 component exists.
 */
	function check_exist_comk2($user_id, $username, $lrdata) {
	  JPlugin::loadLanguage('com_k2');
      JTable::addIncludePath(JPATH_ADMINISTRATOR.DS.'components'.DS.'com_k2'.DS.'tables');
      $row = &JTable::getInstance('K2User', 'Table');
      $k2id = $this->getK2UserID($user_id);
      JRequest::setVar('id', $k2id, 'post');
      $row->bind(JRequest::get('post'));
      $row->set('userID', $user_id);
      $row->set('userName',  $username);
      $row->set('ip', $_SERVER['REMOTE_ADDR']);
      $row->set('hostname', gethostbyaddr($_SERVER['REMOTE_ADDR']));
      $row->set('notes', '');
      $row->set('group', trim($this->params->get('k2id')));
      $row->set('gender', JRequest::getVar('gender'));
      $row->set('url', JRequest::getVar('url'));
      $row->set('description', JRequest::getVar('description', '', 'post', 'string', 2));
      $imagefile = substr($lrdata['thumbnail'], 10);
      $savepath = JPATH_ROOT.DS.'media'.DS.'k2'.DS.'users'.DS;
      $imagefile = str_replace("/","_",$imagefile);
      if(!empty($lrdata['thumbnail']) && $lrdata['Provider'] != 'google') {
        copy($lrdata['thumbnail'], $savepath.$imagefile);
        $row->set('image', $imagefile);
      }
      $row->store();
    }
	
/*
 * Function that inserting data in cb table.
 */
	function make_cb_user($lrdata, $user) {
	  $db =& JFactory::getDBO();
	  $cbimagefile = substr($lrdata['thumbnail'], 10);
      $cbsavepath = JPATH_ROOT.DS.'images'.DS.'comprofiler'.DS;
      $cbimagefile = str_replace("/","_",$cbimagefile);
      if(!empty($lrdata['thumbnail']) && $lrdata['Provider'] != 'google') {
        copy($lrdata['thumbnail'], $cbsavepath.$cbimagefile);
      }
      $cbquery = "INSERT IGNORE INTO #__comprofiler(id,user_id,avatar) VALUES ('".$user->get('id')."','".$user->get('id')."','".$cbimagefile."')";
      $db->setQuery($cbquery);
      $db->query();
	}
	
/*
 * Function that inserting data in jom social user table.
 */
	function make_jomsocial_user($lrdata, $user) {
	  $db =& JFactory::getDBO();
	 // Check for jom social.
	  $joomimagefile = substr($lrdata['thumbnail'], 10);
      $joomsavepath = JPATH_ROOT.DS.'images'.DS.'avatar'.DS;
      $joomimagefile = str_replace("/","_",$joomimagefile);
      if (!empty($lrdata['thumbnail']) && $lrdata['Provider'] != 'google') {
        copy($lrdata['thumbnail'], $joomsavepath.$joomimagefile);
      }
      $joomimagefile = 'images/avatar/'.$joomimagefile;
	  $joomquery = "INSERT IGNORE INTO #__community_users(userid,avatar,thumb) VALUES('".$user->get('id')."','".$joomimagefile."','".$joomimagefile."')";
      $db->setQuery($joomquery);
      $db->query();
	}
	
/*
 * Function getting k2 plugin userID.
 */
	function getK2UserID($id)
	{
        $db = &JFactory::getDBO();
		$query = "SELECT id FROM #__k2_users WHERE userID={$id}";
		$db->setQuery($query);
		$result = $db->loadResult();
		return $result;
	}

/*
 * Function getting return url after login.
 */
    function getReturnURL() {
     $app = JFactory::getApplication();
     $router = $app->getRouter();
     $url = null;
     if ($itemid = $this->params->get('login')) {
       $db = JFactory::getDbo();
       $query = $db->getQuery(true);
       $query->select($db->nameQuote('link'));
       $query->from($db->nameQuote('#__menu'));
       $query->where($db->nameQuote('published') . '=1');
       $query->where($db->nameQuote('id') . '=' . $db->quote($itemid));
       $db->setQuery($query);
       if ($link = $db->loadResult()) {
         if ($router->getMode() == JROUTER_MODE_SEF) {
           $url = 'index.php?Itemid='.$itemid;
         }
         else {
           $url = $link.'&Itemid='.$itemid;
         }
       }
     }
     if (!$url) {
       // stay on the same page
       $uri = clone JFactory::getURI();
       $vars = $router->parse($uri);
       unset($vars['lang']);
       if ($router->getMode() == JROUTER_MODE_SEF) {
         if (isset($vars['Itemid'])) {
           $itemid = $vars['Itemid'];

           $menu = $app->getMenu();
           $item = $menu->getItem($itemid);
           unset($vars['Itemid']);
           if (isset($item) && $vars == $item->query) {
             $url = 'index.php?Itemid='.$itemid;
           }
           else {
             $url = 'index.php?'.JURI::buildQuery($vars).'&Itemid='.$itemid;
           }
         }
         else {
           $url = 'index.php?'.JURI::buildQuery($vars);
         }
       }
       else {
         $url = 'index.php?'.JURI::buildQuery($vars);
       }
     }
     return $url;
  }
  
/*
 * Function open a popup for enter email.
 */
  function enterEmailPopup($msg) {
     $document =& JFactory::getDocument();
	 $session =& JFactory::getSession();
	 $lrdata = $session->get('tmpuser');
     $document->addStyleSheet(JURI::root().'modules/mod_LoginRadius/style.css');
	 $output = '<div class="LoginRadius_overlay" class="LoginRadius_content_IE">';
	 $output .='<div id="popupouter"><div id="popupinner"><div id="textmatter">';
     if ($msg) {
       $output .= "<b>" . JText::sprintf($msg) . "</b>";
     }
     $output .= '</div><form method="post" action=""><div>';
	 $output .= '<input type="text" name="email" id="email" class="inputtxt"/></div><div>';
	 $output .= '<input type="submit" name="sociallogin_emailclick" value="'.JText::_('JLOGIN').'" class="inputbutton"/>';
	 $output .= '<input type="submit" value="'.JText::_('JCANCEL').'" name = "cancel" class="inputbutton"/>';
	 $output .= '<input type="hidden" name ="session" value="'.$lrdata['session'].'"/>';
	 $output .= '</div></form></div></div></div>';
	 $document->addCustomTag($output);
  }

/*
 * Function getting user data from loginradius.
 */
	function get_userprofile_data($userprofile) {
      $lrdata['session'] = uniqid('LoginRadius_', true);
      $lrdata['FullName'] = (!empty($userprofile->FullName) ? $userprofile->FullName : "");
      $lrdata['ProfileName'] = (!empty( $userprofile->ProfileName) ? $userprofile->ProfileName : "");
      $lrdata['fname'] = (!empty( $userprofile->FirstName) ? $userprofile->FirstName : "");
      $lrdata['lname'] = (!empty($userprofile->LastName) ? $userprofile->LastName : "");
	  $lrdata['NickName'] = (!empty($userprofile->NickName) ? $userprofile->NickName : "");
      $lrdata['id'] = (!empty($userprofile->ID) ? $userprofile->ID : "");
      $lrdata['Provider'] = (!empty($userprofile->Provider) ? $userprofile->Provider : "");
	  $lrdata['email'] = (sizeof($userprofile->Email) > 0 ? $userprofile->Email[0]->Value : "");
      $lrdata['thumbnail'] = (!empty ($userprofile->ImageUrl) ? trim($userprofile->ImageUrl) : "");
	  $lrdata['address1'] = (!empty($userprofile->Addresses) ? $userprofile->Addresses :"");
	  if (empty($lrdata['thumbnail']) && $lrdata['Provider'] == 'facebook') {
	      $lrdata['thumbnail'] = "http://graph.facebook.com/".$lrdata['id']."/picture";
	  }
	  if (empty($lrdata['address1'])) {
	    $lrdata['address1'] = (!empty($userprofile->MainAddress) ? $userprofile->MainAddress:"");
	  }
      $lrdata['address2'] = $lrdata['address1'];
	  $lrdata['city'] = (!empty($userprofile->City) ? $userprofile->City : "");
	  if (empty($lrdata['city'])) {
	    $lrdata['city'] = (!empty($userprofile->HomeTown) ? $userprofile->HomeTown : "");
	  }
	  $lrdata['country'] = (!empty($userprofile->Country) ? $userprofile->Country: "");
	  if (empty($lrdata['country'])) {
	    $lrdata['country'] = (!empty($userprofile->Country->Name) ? $userprofile->Country->Name : "");
	  }
	  $lrdata['aboutme'] = (!empty($userprofile->About) ? $userprofile->About : "");
	  $lrdata['website'] = (!empty( $userprofile->ProfileUrl) ? $userprofile->ProfileUrl : "");
	  $lrdata['dob'] = (!empty($userprofile->BirthDate) ? $userprofile->BirthDate : "");
	  return $lrdata;
   }
   
/*
 * Function that generate a random email.
 */
   function get_random_email($lrdata) {
     switch ($lrdata['Provider']){
		case 'twitter':
          $lrdata['email'] = $lrdata['id'].'@'.$lrdata['Provider'].'.com';
          break;
        case 'linkedin':
		  $lrdata['email'] = $lrdata['id'].'@'.$lrdata['Provider'].'.com';
		  break;
		default:
          $Email_id = substr($lrdata['id'],7);
          $Email_id2 = str_replace("/", "_", $Email_id);
	      $lrdata['email'] = str_replace(".", "_", $Email_id2).'@'.$lrdata['Provider'].'.com';
		  break;
        }
		return $lrdata['email'];
   }
   
/*
 * Function that checking username exist then adding index to it.
 */
   function get_exist_username($username) {
     $nameexists = true;
        $index = 0;
        $userName = $username;
        while ($nameexists == true) {
          if (JUserHelper::getUserId($userName) != 0) {
            $index++;
            $userName = $username.$index;
          } 
		  else {
            $nameexists = false;
          }
        }
		return $userName;
   }
   
/*
 * Function that remove unescaped char from string.
 */
	function remove_unescapedChar($str) {
	 return preg_replace("/([]'[@!()&*~`@#$%^{}|.?<>_+=,-])/e",  "", $str);
	}
}