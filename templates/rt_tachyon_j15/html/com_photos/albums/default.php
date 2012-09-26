<?php defined('KOOWA') or die ?>

<?= $application_header ?>
<?= $actor_header ?>

<?= @template('list') ?>

<div class="an-se-module an-se-rounded">
	<a title="<?= @text('AN-SE-RSS-ABBR') ?>" class="an-se-rss-link" href="<?= $rss_link ?>">
		<?= @text('AN-SE-RSS') ?>
	</a>
</div>	