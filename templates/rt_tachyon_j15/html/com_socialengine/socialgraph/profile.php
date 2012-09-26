<?php defined('KOOWA') or die ?>
<?php 
	//set the people list to grid layout
	$peopleView = @get('lib.anahita.sekit.person.view.list')->setLayout(AnSekitPersonViewList::LAYOUT_GRID);
	
  	$view = @get('lib.anahita.uikit.tab.view');  	
  	
	if( $followers->getTotal() )
   		$view->addTab(@text('AN-SE-SOCIALGRAPH-FOLLOWERS'), $peopleView->setList($followers));
   			
	if( $leaders->getTotal() )
   		$view->addTab(@text('AN-SE-SOCIALGRAPH-LEADERS'), $peopleView->setList($leaders));
?>
		      		
<?php if(count($view->tabs)) : ?>  
<?= $view->setStyle(AnUikitTabView::STYLE_LINK); ?>
<?php else : ?>
<div class="an-se-message message"><?= @text('AN-SE-SOCIALGRAPH-EMPTY-MESSAGE') ?></div>
<?php endif; ?>

<div id="an-se-socialgraph-gadget-profile-stat">  
	<dl class="an-se-meta">
		<dt><?= @text('AN-SE-SOCIALGRAPH-FOLLOWERS') ?></dt>
		<dd><?= $followers->getTotal() ?></dd>
		
		<dt><?= @text('AN-SE-SOCIALGRAPH-LEADERS') ?></dt>
		<dd><?= $leaders->getTotal() ?></dd>
	</dl>
	<div class="an-se-clr"></div>
</div>

