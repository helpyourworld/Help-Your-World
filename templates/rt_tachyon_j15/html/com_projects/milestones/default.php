<?php defined('KOOWA') or die; ?>

<?= $application_header ?>
<?= $actor_header ?>

<?php if($actor->getAcl()->allowPublish('com_projects:milestone') ): ?>
<div class="an-se-pane an-se-rounded rounded">
	<ul class="an-se-toolbar">
		<li class="an-se-toolbar-item">
			<a class="an-projects-milestone-link-add" href="<?= @route('view=milestone&layout=add&oid='.$actor->id) ?>">
			<?= @text('AN-PROJECTS-MILESTONE-LINK-ADD') ?>
			</a>
		</li>
	</ul>
</div>
<?php endif; ?>

<div id="an-se-entities-wrapper" class="an-se-entities-wrapper">
<?= @template('list') ?>
</div>