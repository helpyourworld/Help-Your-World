<?php defined('KOOWA') or die('Restricted access');?>

<?= $application_header ?>
<?= $actor_header ?>


<?php if( $filter == '' ) : ?>
<module position="sidebar-a" style="standard" title="<?= @text('AN-PHOTOS-MODULE-HEADER-ALBUMS') ?>">
	<!-- START LATEST ALBUMS -->
	 <?= @get('site::com.photos.controller.album')->setRequest(array('layout'=>'list', 'oid'=>$actor->id,'limit'=>3))->browse(); ?>
	<!-- END LATEST ALBUMS -->
</module>
<?php endif; ?>


<?php if($actor->getAcl()->allowPublish('com_photos:photos') && $filter == '' ): ?>
<div class="an-se-pane an-se-rounded">
	<ul class="an-se-toolbar">
		<li class="an-se-toolbar-item">
			<a class="an-photos-photo-add-link" href="<?= @route('view=photo&layout=upload&oid='.$actor->id) ?>">
			<?= @text('AN-PHOTOS-LINKS-PHOTOS-ADD') ?>
			</a>
		</li>
	</ul>
</div>
<?php endif; ?>

<?= @template('list') ?>

<div class="an-se-pane">
<a title="<?= @text('AN-SE-RSS-ABBR') ?>" class="an-se-rss-link" href="<?= $rss_link ?>">
	<?= @text('AN-SE-RSS') ?>
</a>
</div>