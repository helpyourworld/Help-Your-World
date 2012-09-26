<?php defined('KOOWA') or die('Restricted access');?>

<script src="media://com_discussions/js/search.js" />
<script>	
	new SearchActionHandler({'view':'topics', 'oid':'<?= $actor->id ?>' });
</script>

<?= $application_header ?>
<?= $actor_header; ?>

<div id="an-discus-search-form-wrapper" class="an-se-pane an-se-rounded">
	<form id="an-discus-search-form" action="index.php?option=com_discussions&oid=<?= $actor->id ?>&layout=search" method="get">
		<div class="an-se-panelset">
		 	<div class="an-se-tabpanel">
		 		 		
				<dl class="an-se-form an-se-data-list">	
					<dt><label for="an-dicus-search-field-keyword"><?= @text('AN-DISCUS-SEARCH-FIELD-KEYWORDS') ?></label></dt>
					<dd>
						<input type="text" name="q" id="an-discus-search-field-q" size="20" maxlength="20" /> 
						<button id="an-se-entities-search-button" class="button an-se-button" type="submit"><?= @text('AN-SE-ACTION-SEARCH') ?></button>
					</dd>
				
					<dt><label for="an-dicus-search-field-entity"><?= @text('AN-DISCUS-SEARCH-FIELD-ENTITY') ?></label></dt>
					<dd>
						<input checked="checked" type="radio" id="an-dicus-search-field-entity-topics" class="an-discus-search-field-entity" name="view" value="topics" />
						<label for="an-dicus-search-field-entity-topics"><?=@text('AN-DISCUS-SEARCH-FIELD-ENTITY-TOPICS')?></label>
						<input type="radio" id="an-dicus-search-field-entity-comments" class="an-discus-search-field-entity" name="view" value="comments" />
						<label for="an-dicus-search-field-entity-comments"><?=@text('AN-DISCUS-SEARCH-FIELD-ENTITY-COMMENTS')?></label>
					</dd>
				
					<dt><label for="an-dicus-search-field-ql-terms"><?= @text('AN-DISCUS-SEARCH-FIELD-QUERY-LOGIC-TERMS') ?>:</label></dt>
					<dd>
						<input checked="checked" type="radio" id="an-dicus-search-field-ql-terms-all" class="an-discus-search-field-ql" name="ql_terms" value="all" />
						<label for="an-dicus-search-field-ql-terms-all"><?=@text('AN-DISCUS-SEARCH-FIELD-QUERY-LOGIC-TERMS-ALL')?></label>
						<input type="radio" id="an-dicus-search-field-ql-terms-any" class="an-discus-search-field-ql" name="ql_terms" value="any" />
						<label for="an-dicus-search-field-ql-terms-any"><?=@text('AN-DISCUS-SEARCH-FIELD-QUERY-LOGIC-TERMS-ANY')?></label>
					</dd>
				</dl>
				
			</div>
		</div>	
		<div class="an-se-clr"></div>
	</form>
</div>



<div id="an-se-entities-wrapper" class="an-se-entities-wrapper"></div>
