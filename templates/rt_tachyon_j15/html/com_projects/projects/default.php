<?php defined('KOOWA') or die; ?>
<script src="media://lib_anahita/js/socialgraph.js" />
<script>
 AnFactory.instantiate('AnSekitPersonSocialGraph');
</script>
<?= $application_header ?>
<?= $actor_header ?>

<?= @get('lib.anahita.sekit.search.view.form')->setSearchPath(@route('view=projects&layout=list&filter='.$filter.'&oid='.$actor->id)); ?>

<?php if( get_application('com_projects')->getAcl()->allowPublishNewActor('projects')): ?>
<div class="an-se-pane an-se-rounded rounded">
	<ul class="an-se-toolbar">
		<li class="an-se-toolbar-item"><a class="an-projects-add-link" href="<?= 'index.php?option=com_projects&view=project&layout=add&filter=administrating&oid='.$actor->id ?>"><?= @text('AN-PROJECTS-LINK-ADD') ?></a></li>
	</ul>
</div>
<?php endif; ?>

<div id="an-se-entities-wrapper" class="an-se-entities-wrapper">
<?= @template('list') ?>
</div>