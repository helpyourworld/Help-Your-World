<?php defined('KOOWA') or die ?>

<?= $application_header; ?>
<?= $actor_header; ?>

<module position="sidebar-a" title="<?= @text('AN-PROJECTS-TODOLISTS') ?>" style="standard">
<?php if($milestone->todolists->getTotal()): ?>
<?php $todolists = $milestone->todolists->limit(5); ?>
	<ul class="an-se-medium-list">
		<?php foreach($todolists as $todolist): ?>
		<li class="an-projects-medium-list-item an-se-medium-list-item">
			<h4 class="an-projects-medium-title an-se-medium-list-item-title">
				<a href="<?= $todolist->getURL(); ?>"><?= stripslashes($todolist->title) ?></a>
			</h4>
			
			<?php if($todolist->description): ?>
			<div class="an-projects-medium-description an-se-medium-list-item-description">
			<?= AnCsStringHelper::truncate(stripslashes($todolist->description), array('length'=>100)) ?>
			</div>
			<?php endif; ?>
		</li>
		<?php endforeach; ?>
	</ul>
	<div class="an-se-clr"></div>
<?php else: ?>
<?= @message(@text('AN-PROJECTS-TODOLISTS-EMPTY-LIST-MESSAGE')) ?>
<?php endif; ?>
</module>

<!-- START MILESTONE INFO -->
<?= @template('milestone') ?>
<!-- END MILESTONE INFO -->

<!--  START COMMENTS FORM -->
<div class="an-se-pane an-se-rounded rounded">
<?= @comments($milestone, array('pagination'=>true)) ?>
</div>
<!-- END COMMENTS FORM -->