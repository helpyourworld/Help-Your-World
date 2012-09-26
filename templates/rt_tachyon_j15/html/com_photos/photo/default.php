<?php defined('KOOWA') or die; ?>

<?php if( $photo->getAcl()->allowUpdate() ) : ?>
<script src="media://com_photos/js/medium.js" />
<script src="media://com_photos/js/album.js" />
<script>	
	new MediumActionHandler({'type':'photo'});
</script>
<?php endif; ?>

<?= $application_header ?>
<?= $actor_header ?>

<?php if($photo->albums->getTotal()): ?>
<module position="sidebar-b" title="<?= @text('AN-PHOTOS-PHOTO-RELATED-ALBUMS') ?>" style="standard">
	<ul id="an-photos-albums-list" class="an-photos-albums-list">
	<?php foreach( $photo->albums as $album) : ?>
	<?= @get('site::com.photos.view.album.html')->setLayout('list')->assign('album', $album); ?>
	<?php endforeach; ?>
	</ul>
	<div class="an-se-clr"></div>
</module>
<?php endif; ?>


<module position="sidebar-b" title="<?= @text('AN-PHOTOS-MEDIUM-META') ?>" style="standard">	
	<ul class="an-photos-medium-meta">
		<li><?= sprintf( @text('AN-PHOTOS-PHOTO-TIMESTAMP-CREATED-ON'), @date($photo->creationTime)) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-PHOTO-TIMESTAMP-UPDATED-ON'), @date($photo->lastUpdateTime)) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-PHOTO-META-HITS'), $photo->hits) ?></li>
		<li><?= sprintf(@text('AN-PHOTOS-PHOTO-META-ALBUMS'), $photo->albums->getTotal() ) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-PHOTO-META-COMMENTS'), $photo->comments->getTotal()) ?></li>
	</ul>
	<div class="an-se-clr"></div>
</module>	

	
<?php if ( $actor->getAcl()->allowAdministration() ) : ?>
<module position="sidebar-b" title="<?= @text('AN-PHOTOS-PHOTO-PRIVACY') ?>" style="standard">		
	<?= @privacy($photo) ?>
</module>	
<?php endif; ?>


<!-- START PHOTO INFO -->
<?= @template('photo') ?>
<!-- END PHOTO INFO -->

<!--  START COMMENTS -->
<div class="an-se-pane an-se-rounded rounded">
<?= @comments($photo, array('pagination'=>true)) ?>
</div>
<!-- END COMMENTS -->

<div class="an-se-pane">
	<a title="<?= @text('AN-SE-RSS-ABBR') ?>" class="an-se-rss-link" href="<?= $rss_link ?>">
		<?= @text('AN-SE-RSS') ?>
	</a>
</div>	
