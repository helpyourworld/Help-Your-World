<?php
/**
 * @package   Tachyon Template - RocketTheme
 * @version   1.6.8 August 14, 2012
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Rockettheme Tachyon Template uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */
// no direct access
defined( '_JEXEC' ) or die( 'Restricted index access' );

// load and inititialize gantry class
require_once('lib/gantry/gantry.php');
$gantry->init();

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $gantry->language; ?>" lang="<?php echo $gantry->language;?>">
	<head>
	<?php 
	    $gantry->displayHead();
	    $gantry->addStyles(array('template.css','joomla.css'));
	  ?>
	</head>
	<body class="bodylevel-high">
		<div id="rt-header-surround">
		    <div id="rt-header-background">
		      	<div id="rt-header">
			    	<div class="rt-container">
			            <div class="rt-grid-12 rt-alpha">
			            	<div class="rt-block">
			                	<a href="#" id="rt-logo" name="rt-logo"></a>
			              	</div>
			            </div>
			            <div class="clear"></div>
			    	</div>
		      	</div>
		    </div>
		    <div id="rt-header-bottom"></div>
		</div>
		<div id="rt-body-background">
			<div class="rt-container">
				<div class="rt-grid-12 box3">
			    	<div class="rt-block">
			            <h1>Unsupported Browser</h1>
			            <p>We have detected that you are using Internet Explorer 6, a browser version that is not supported by this website. Internet Explorer 6 was released in August of 2001, and the latest version of IE6 was released in August of 2004. It is no longer supported by Microsoft.</p>
			            <p>Continuing to run IE6 leaves you open to any and all security vulnerabilities discovered since that date. In March of 2009, Microsoft released version 8 of Internet Explorer that, in addition to providing greater security, is faster and more standards compliant than both version 6 and 7 that came before it.</p>
			            <p>We suggest installing the <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">latest version of Internet Explorer</a>, or the latest version of these other popular browsers: <a href="http://www.mozilla.com/en-US/firefox/firefox.html">Firefox</a>, <a href="http://www.google.com/chrome">Google Chrome</a>, <a href="http://www.apple.com/safari/download/">Safari</a>, <a href="http://www.opera.com/">Opera</a></p>
			 		</div>
			 	</div>
			 	<div class="clear"></div>
			</div>
		</div>
		<div id="rt-footer-surround">
			<?php /** Begin Copyright **/ if ($gantry->countModules('copyright')) : ?>
			<div id="rt-copyright">
				<div class="rt-container">
					<?php echo $gantry->displayModules('copyright','standard','standard'); ?>
					<div class="clear"></div>
				</div>
			</div>
			<?php /** End Copyright **/ endif; ?>
		</div>
	</body>
</html>
<?php
$gantry->finalize();
?>