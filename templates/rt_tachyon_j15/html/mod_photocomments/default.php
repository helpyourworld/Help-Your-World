<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="photocomments">
	<ul class="photocomments-list">
	<?php
	if( $comments )
	{
		$i		= 1;
		$total	= count( $comments );
	
		foreach( $comments as $comment )
		{
			$poster	= CFactory::getUser( $comment->post_by );
		
			if( $comment->phototype == PHOTOS_USER_TYPE )
			{
				$link	= CRoute::_('index.php?option=com_community&view=photos&task=photo&albumid=' . $comment->albumid . '&photoid=' . $comment->contentid . '&userid=' . $comment->creator ) . '#photoid=' . $comment->contentid;
			}
			else
			{
				$link	= CRoute::_('index.php?option=com_community&view=photos&task=photo&albumid=' . $comment->albumid . '&photoid=' . $comment->contentid . '&groupid=' . $comment->groupid ) . '#photoid=' . $comment->contentid;
			}
	?>
		<li style="<?php echo ( $i != $total ) ?>">
			<?php
				if( $params->get('show_avatar') )
				{
			?>
			<img class="photo" src="<?php echo $poster->getThumbAvatar(); ?>" />
			<?php
				}
			?>
			<div style="<?php echo $params->get('show_avatar') ? 'margin-left: 54px;' : '';?>" class="description">
				<a class="comment-title" href="<?php echo $link;?>"><?php echo $comment->caption;?></a>
				<span class="comment"><?php echo $comment->comment;?></span>
			</div>
			<div class="clear"></div>
		</li>
	<?php
			$i++;
		}
	}
	else
	{
	?>
	<li><?php echo JText::_('MOD_PHOTOCOMMENTS_NO_COMMENTS');?></li>
	<?php
	}
	?>
	</ul>
</div>