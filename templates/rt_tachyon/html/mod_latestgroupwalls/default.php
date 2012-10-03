<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>

<?php
if (count($walls)>0)
{
?>

<ul class="mod_latestgroupwalls">
<?php
	$charactersCount	= $params->get('charcount' , 100 );
	foreach( $walls as $wall )
	{
		$user			= CFactory::getUser( $wall->post_by );
		$wall->comment	= CComment::stripCommentData( $wall->comment );
		$comment		= JString::substr( $wall->comment , 0 , $charactersCount);		
		$comment		.= ( $charactersCount > JString::strlen( $wall->comment ) ) ? '' : '...';
		
		$groupId        = $wall->contentid;
		$groupname      = CStringHelper::escape($wall->groupname);
		$grouplink 		= CRoute::_('index.php?option=com_community&view=groups&task=viewgroup&groupid=' . $wall->contentid );
		
		$table	= & JTable::getInstance( 'Group' , 'CTable' );
		$table->load( $groupId );
		$groupavatar = $table->getThumbAvatar();
?>
	<li>
	<?php
		if( $params->get('show_avatar') )
		{
	?>
		<div class="latestgroupwalls-avatar">
			<a title="<?php echo $groupname; ?>" href="<?php echo $grouplink; ?>">
				<img class="group" src="<?php echo $groupavatar; ?>" alt="<?php echo $groupname; ?>" />
			</a>
		</div>
	<?php
		}
	?>
		<div style="<?php echo $params->get('show_avatar') ? 'margin-left: 53px;' : '';?>" class="latestgroupwalls-item">
			<span style="width: 100%;"><a href="<?php echo $grouplink; ?>"><?php echo $groupname; ?></a></span>
			<span style="display: block;margin-top: 3px;"><?php echo $comment;?></span>
		</div>
		<div style="clear: both;"></div>
	</li>
<?php
	}
?>
</ul>
<?php
}
?>