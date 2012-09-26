<?php defined('KOOWA') or die ?>

<?php if( $album->getAcl()->allowUpdate() ) : ?>
<script src="media://com_photos/js/medium.js" />
<script src="media://com_photos/js/album.js" />
<script>	
	new MediumActionHandler({'type':'album'});
</script>
<?php endif; ?>

<?= $application_header ?>
<?= $actor_header ?>

<!-- START ALBUM META -->
<module position="sidebar-b" title="<?= @text('AN-PHOTOS-MEDIUM-META') ?>" style="standard">
	<ul class="an-photos-medium-meta">
		<li><?= sprintf( @text('AN-PHOTOS-ALBUM-TIMESTAMP-CREATED-ON'), @date($album->creationTime)) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-ALBUM-TIMESTAMP-UPDATED-ON'), @date($album->lastUpdateTime)) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-ALBUM-META-HITS'), $album->hits) ?></li>
		<li><?= sprintf(@text('AN-PHOTOS-ALBUM-META-PHOTOS'), $album->photos->getTotal() ) ?></li>
		<li><?= sprintf( @text('AN-PHOTOS-ALBUM-META-COMMENTS'), $album->comments->getTotal()) ?></li>
	</ul>
</module>
<!-- END ALBUM META -->

<!-- START ALBUM INFO -->
<?= @template('album') ?>
<!-- END ALBUM INFO -->

<!--  START COMMENTS FORM -->
<div class="an-se-pane an-se-rounded">
<?= @comments($album, array('pagination'=>true)) ?>
</div>
<!-- END COMMENTS FORM -->

<div class="an-se-pane">
	<a title="<?= @text('AN-SE-RSS-ABBR') ?>" class="an-se-rss-link" href="<?= $rss_link ?>">
		<?= @text('AN-SE-RSS') ?>
	</a>
</div>



