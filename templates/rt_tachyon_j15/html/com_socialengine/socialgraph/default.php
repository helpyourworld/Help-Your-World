<?php defined('KOOWA') or die; ?>

<?= $header ?>
<?= $actor_header ?>
<?= @get('lib.anahita.sekit.search.view.form')->setSearchPath('index.php?option=com_socialengine&view=socialgraph&layout=list&graph='.$graph) ?>

<module position="sidebar-a" title="<?= @text('AN-SE-SOCIALGRAPH-STATS') ?>" style="standard">
	<dl class="an-se-meta">
		<dt><?= @text('AN-SE-SOCIALGRAPH-FOLLOWERS') ?></dt>
		<dd><?= $followers_count ?></dd>
		
		<dt><?= @text('AN-SE-SOCIALGRAPH-LEADERS') ?></dt>
		<dd><?= $leaders_count ?></dd>
		
		<dt><?= @text('AN-SE-SOCIALGRAPH-MUTUAL') ?></dt>
		<dd><?= $mutuals_count ?></dd>
	</dl>
	<div class="an-se-clr"></div>
</module>

<div id="an-se-entities-wrapper" class="an-se-entities-wrapper">
<?= @template('list') ?>
</div>