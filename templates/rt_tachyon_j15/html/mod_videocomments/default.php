<?php
/**
 * @category	Modules
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
defined('_JEXEC') or die('Restricted access');
?>
<div class="videocomments">
	<ul class="videocomments-list">
	<?php
	if( $comments )
	{
		$i		= 1;
		$total	= count( $comments );
		$char_limit	= intval($params->get('character_limit'));
	
		foreach( $comments as $comment )
		{
			//$comment->comment = CStringHelper::truncate($comment->comment, $char_limit);
			if( ($char_limit > 0) && (JString::strlen($comment->comment) > $char_limit) )
			{
				$comment->comment = JString::substr($comment->comment, 0, $char_limit) . '...';
			}
		
			$poster	= CFactory::getUser( $comment->post_by );
		
			if( $comment->creator_type == VIDEO_USER_TYPE )
			{
				$link	= CRoute::_('index.php?option=com_community&view=videos&task=video&videoid=' . $comment->contentid . '&userid=' . $comment->creator );
			}
			else
			{
				$link	= CRoute::_('index.php?option=com_community&view=videos&task=video&videoid=' . $comment->contentid . '&groupid=' . $comment->groupid );
			}
		
	?>
		<li style="<?php echo ( $i != $total ) ?>">
			<?php
				if( $params->get('show_avatar') )
				{
			?>
			<img class="video" src="<?php echo $poster->getThumbAvatar(); ?>" />
			<?php
				}
			?>
			<div style="<?php echo $params->get('show_avatar') ? 'margin-left: 54px;' : '';?>;">
				<a class="comment-title" href="<?php echo $link;?>"><?php echo $comment->title;?></a>
	            <span class="comment"><?php echo CStringHelper::escape($comment->comment); ?></span>
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
	<li><?php echo JText::_('MOD_VIDEOCOMMENTS_NO_COMMENTS');?></li>
	<?php
	}
	?>
	</ul>
</div>