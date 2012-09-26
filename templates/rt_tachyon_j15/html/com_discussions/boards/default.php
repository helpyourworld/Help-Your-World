<?php defined('KOOWA') or die('Restricted access');?>

<?= $application_header ?>
<?= $actor_header; ?>

<?php if( $actor->getAcl()->allowAdministration() ): ?>
<div class="an-se-pane an-se-rounded">

	<ul class="an-se-toolbar-list">
		<li class="an-se-toolbar-item"><a class="an-discus-board-add-link" href="<?= @route('view=board&layout=add&oid='.$actor->id) ?>"><?= @text('AN-DISCUSSIONS-BOARD-ADD') ?></a></li>
	</ul>
</div>
<?php endif; ?>

<?= @template('list') ?>



