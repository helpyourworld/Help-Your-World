<?php 
/**
 * @version		$Id: default.php 1.4 16 Team LoginRadius
 * @copyright	Copyright (C) 2011 - till Open Source Matters. All rights reserved.
 * @license		GNU/GPL
 */
//no direct access
defined( '_JEXEC' ) or die('Restricted access');
JHtml::_('behavior.keepalive');?>

<?php jimport('joomla.plugin.helper');
 if(!JPluginHelper::isEnabled('system','sociallogin')) :
         JError::raiseNotice ('sociallogin_plugin', JText::_ ('MOD_LOGINRADIUS_PLUGIN_ERROR')); 
 endif; 
      $plugin = JPluginHelper::getPlugin('system','sociallogin');
      $pluginParams = new JRegistry();
      $pluginParams->loadString($plugin->params);?>

<?php if ($type == 'logout') : ?>
<?php if ($pluginParams->get('showlogout') == 1) :?>
<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" id="login-form">
<div class="login-greeting">
	<?php if($pluginParams->get('name') == 0) : {
		echo JText::sprintf('MOD_LOGINRADIUS_HINAME', $user->get('name'));
	} else : {
		echo JText::sprintf('MOD_LOGINRADIUS_HINAME', $user->get('username'));
	} endif; ?>
</div>
	<div class="logout-button">
		<input type="submit" name="Submit" class="button" value="<?php echo JText::_('JLOGOUT'); ?>" />
		<input type="hidden" name="option" value="com_users" />
		<input type="hidden" name="task" value="user.logout" />
		<input type="hidden" name="return" value="<?php echo $return; ?>" />
		<?php echo JHtml::_('form.token');?>		
	</div>
</form>
<?php endif; ?>
<?php else : ?>
<?php 
    require_once ( JPATH_BASE .DS.'modules'.DS.'mod_LoginRadius'.DS.'LoginRadiusSDK.php' );
    $LoginRadius_apikey ='';
	if ($pluginParams->get('apikey')): ?>
	<?php $LoginRadius_apikey = $pluginParams->get('apikey'); ?>
	<?php endif; ?>
	<?php if ($pluginParams->get('apisecret')): ?>
	<?php $LoginRadius_apisecret = $pluginParams->get('apisecret'); ?>
	<?php endif; ?>
	<?php $ApiCred='';
	if ($pluginParams->get('apicred')): ?>
	<?php $ApiCred = $pluginParams->get('apicred'); ?>
	<?php endif; ?>
<form action="<?php echo JRoute::_('index.php', true, $params->get('usesecure')); ?>" method="post" id="login-form" >
	<?php if ($pluginParams->get('showbutton') == 0) {
	       echo $params->get('pretext');
	       showInterface($LoginRadius_apikey, $LoginRadius_apisecret, $ApiCred);
		 }
 if ($pluginParams->get('usetrad') == 1): ?>
<div id='usetrad' name='usetrad'>
<?php	if ($params->get('pretext')): ?>
		<div class="pretext"></div>
	<?php endif; ?>
	<fieldset class="userdata">
	<p id="form-login-username">
		<label for="modlgn-username"><?php echo JText::_('MOD_LOGINRADIUS_VALUE_USERNAME') ?></label>
		<input id="modlgn-username" type="text" name="username" class="inputbox"  size="18" />
	</p>
	<p id="form-login-password">
		<label for="modlgn-passwd"><?php echo JText::_('JGLOBAL_PASSWORD') ?></label>
		<input id="modlgn-passwd" type="password" name="password" class="inputbox" size="18"  />
	</p>
	<?php if (JPluginHelper::isEnabled('system', 'remember')) : ?>
	<p id="form-login-remember">
		<label for="modlgn-remember"><?php echo JText::_('MOD_LOGINRADIUS_REMEMBER_ME') ?></label>
		<input id="modlgn-remember" type="checkbox" name="remember" class="inputbox" value="yes"/>
	</p>
	<?php endif; ?>
	<input type="submit" name="Submit" class="button" value="<?php echo JText::_('JLOGIN') ?>" />
	<input type="hidden" name="option" value="com_users" />
	<input type="hidden" name="task" value="user.login" />
	<input type="hidden" name="return" value="<?php echo $return; ?>" />
	<?php echo JHtml::_('form.token'); ?>
	</fieldset></div><?php endif; ?>
	<?php if ($pluginParams->get('showbutton') == 1) {
	       echo $params->get('pretext');
	       showInterface($LoginRadius_apikey, $LoginRadius_apisecret, $ApiCred);
		 }
 if ($pluginParams->get('usetrad') == 1): ?>
<div id='usetrad1' name = 'usetrad1'>
<ul>
		<li>
			<a href="<?php echo JRoute::_('index.php?option=com_users&view=reset'); ?>">
			<?php echo JText::_('MOD_LOGINRADIUS_FORGOT_YOUR_PASSWORD'); ?></a>
		</li>
		<li>
			<a href="<?php echo JRoute::_('index.php?option=com_users&view=remind'); ?>">
			<?php echo JText::_('MOD_LOGINRADIUS_FORGOT_YOUR_USERNAME'); ?></a>
		</li>
		<?php
		$usersConfig = JComponentHelper::getParams('com_users');
		if ($usersConfig->get('allowUserRegistration')) : ?>
		<li>
			<a href="<?php echo JRoute::_('index.php?option=com_users&view=registration'); ?>">
				<?php echo JText::_('MOD_LOGINRADIUS_REGISTER'); ?></a>
		</li>
		<?php endif; ?>
	</ul></div><?php endif; ?>
	<?php if ($params->get('posttext')): ?>
		<div class="posttext">
		<p><?php echo $params->get('posttext'); ?></p>
		</div>
	<?php endif; ?>
	</form>
  <?php
 //including some joomla inbuilt files
        $db = & JFactory::getDBO();
		$query="CREATE TABLE IF NOT EXISTS #__LoginRadius_users(id int(11) ,LoginRadius_id varchar(255))";
		$db->setQuery($query);
		$db->query();
   endif;?>
<?php
function showInterface($LoginRadius_apikey, $LoginRadius_apisecret, $ApiCred) {
    if (isValidApiKey(trim($LoginRadius_apikey)) && isValidApiKey(trim($LoginRadius_apisecret))) {
       $obj_auth = new LoginRadiusAuth();
       $UserAuth = $obj_auth->auth($LoginRadius_apikey, $LoginRadius_apisecret, $ApiCred);
	   if (!$UserAuth == false) {
         $IsHttps = (!empty($UserAuth->IsHttps) ? $UserAuth->IsHttps : "");
         $iframeHeight = (!empty($UserAuth->height) ? $UserAuth->height : 50);
         $iframeWidth = (!empty($UserAuth->width) ? $UserAuth->width : 169);
	     if ($IsHttps == 1) {
           $http = "https://";
         }
         else {
           $http = "http://";
         }
         if(isset($_SERVER['REQUEST_URI'])) {
           $loc = urlencode($http.$_SERVER["HTTP_HOST"].$_SERVER['REQUEST_URI']);
	     }
	     else {
           $loc = urlencode($http.$_SERVER["HTTP_HOST"].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
         }?><br />
        <iframe src="<?php echo $http;?>hub.loginradius.com/Control/PluginSlider.aspx?apikey=<?php echo $LoginRadius_apikey;?>&callback=<?php echo $loc;?>" width="<?php echo $iframeWidth;?>" height="<?php echo $iframeHeight;?>" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
<?php }
      else {
	  echo '<br><p style ="color:red;">'.JText::_('MOD_LOGINRADIUS_CONNECTION_ERROR').'(<b>cURL support = enabled</b> OR <b>allow_url_fopen = On</b>)</p>';
	  } 
    }
	else {
      echo '<br><p style ="color:red;">'.JText::_('MOD_LOGINRADIUS_APIKEY_ERROR').' <b><a href ="http://www.loginradius.com" target = "_blank">www.LoginRadius.com</a></b></p>';
	}
}
function isValidApiKey($apikey) {
    return !empty($apikey) && preg_match('/^\{?[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}\}?$/i', $apikey);
}?>