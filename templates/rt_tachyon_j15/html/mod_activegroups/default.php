<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
// no direct access
defined('_JEXEC') or die('Restricted access');
?>
<div>
	<?php
	$showAvatar = $params->get('show_avatar', '1');
	$showTotal	= $params->get('show_total', '1');

	if ( !empty($groups) ) {
	?>
	<ul class="mod_activegroups">
		<?php
		foreach ( $groups as $group ) {
		?>
		<li>
			<?php if ( $showAvatar == 1 ) : ?>
			
				<img src="<?php echo $group->avatar; ?>" alt="<?php echo CStringHelper::escape( $group->name ); ?>" />	
			<?php endif; ?>
			
			<span>
				<a href="<?php echo CRoute::_('index.php?option=com_community&view=groups&groupid='.$group->id.'&task=viewgroup'); ?>">
					<?php echo $group->name; ?>
				</a><br />
				<?php if ( $showTotal == 1 ) : ?>
					<a href="<?php echo CRoute::_( "index.php?option=com_community&view=groups&task=viewmembers&groupid=" . $group->id ); ?>" style="text-decoration: none;"><small>
						<?php echo JText::sprintf( (cIsPlural($group->totalMembers)) ? 'MOD_ACTIVEGROUPS MEMBER MANY':'MOD_ACTIVEGROUPS MEMBER', $group->totalMembers); ?>
					</small></a>
				<?php endif; ?>
			</span>
			
			<?php if ( $showAvatar == 1 ) : ?>
			<div></div>
			<?php endif; ?>
		</li>
		<?php
		}
		?>
	</ul>
	<?php
	}
	else 
	{
		echo JText::_("MOD_ACTIVEGROUPS_NO_ACTIVE_GROUPS");
	}
	?>
</div>