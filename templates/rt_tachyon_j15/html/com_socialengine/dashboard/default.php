<?php defined('KOOWA') or die ?>

<?= $gadgets->remove(AnSekitActorView::GADGET_ID_STORY) ?>

<?php foreach($gadgets as $gadget ) : ?>
<module position="sidebar-a">
	<?= $gadget ?>
</module>
<?php endforeach ?>

