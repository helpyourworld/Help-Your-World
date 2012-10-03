<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="mod_latestmembers">
	<?php
	if( !empty( $row ) )
	{
	?>
		<div>		
			<ul>
			<?php		
			foreach( $row as $data )
			{
				$user 		= CFactory::getUser($data->id);				
				$userName 	= CStringHelper::escape( $user->getDisplayName() );
				$userLink 	= CRoute::_('index.php?option=com_community&view=profile&userid='.$data->id);
				
				$html  = '<li class="latestmembers-item">';
				$html .= '	<a href="'.$userLink.'">';
				if($tooltips)
				{
					$html .= '	<img width="32" src="'.$user->getThumbAvatar().'" class="avatar jomTips" alt="'.$userName.'" title="'.cAvatarTooltip($user).'" style="padding: 2px; border: solid 1px #ccc;" />';
				}
				else
				{
					$html .= '	<img width="32" src="'.$user->getThumbAvatar().'" alt="'. $userName.'" title="'.$userName.'" style="padding: 2px; border: solid 1px #ccc;" />';
				}
				$html .= '	</a>';
				$html .= '</li>';
				echo $html;
			}
			?>
			</ul>
		</div>
		<a href='<?php echo CRoute::_("index.php?option=com_community&view=search&task=browse&sort=latest"); ?>' class="latestmembers-showall"><?php echo JText::_("Show All"); ?></a>
	<?php
	}
	else
	{
		echo JText::_('No members yet');
	}
	?>
	<div style='clear:both;'></div>
</div>