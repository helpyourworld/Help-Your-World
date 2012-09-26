<?php defined('KOOWA') or die('Restricted access'); ?>

<style src="media://lib_anahita/js/upload/upload.css" />
<script src="media://lib_anahita/js/upload/upload.js" />
<script src="media://com_photos/js/upload.js" />
<script src="media://com_photos/js/album.js" />
<script>
	var viewer = <?=@actor_json($viewer)?>;
	var owner  = <?=@actor_json($actor)?>;
	new PhotoUploader({viewer:viewer,owner:owner});	
</script>

<?= $application_header ?>
<?= $actor_header ?>

<div class="an-se-pane an-se-rounded rounded"><?= $actions ?></div>

<div id="upload-status" class="an-se-hide an-se-pane an-se-rounded rounded">
	<div class="wrapper">
		<h4 class="overall-title"></h4>
		<img src="<?= KRequest::root() ?>/media/lib_anahita/js/upload/images/bar.gif" class="progress overall-progress" />
	</div>
	
	<div class="wrapper">
		<h4 class="current-title">File Progress</h4>
		<img src="<?= KRequest::root() ?>/media/lib_anahita/js/upload/images/bar.gif" class="progress current-progress" />
	</div>
	<div class="current-text"></div>
</div>

<div id="an-photos-album-select-wrapper"></div>

<div id="an-photos-upload-pane" class="an-se-pane an-se-rounded rounded">
<h2><?= @text('AN-PHOTOS-UPLOAD-PHOTOS') ?></h2>

	<div id="an-photo-upload-form-pane">	
		<div id="an-se-server-message"></div>
		<form id="an-photo-upload-form" action="<?='index.php?option=com_photos&view=photo&oid='.$actor->id?>" method="post" enctype="multipart/form-data" >	
			<input type="hidden" value="add" name="action" />
			<input type="hidden" value="" name="album_id"  />
			<div id="an-photo-upload-fallback">	
				<label for="upload-photoupload">
					<?= @text('AN-PHOTOS-UPLOAD') ?> 
					<input type="file"   name="photoupload" id="an-photo-upload-file" />
					<input type="submit" class="button" value="<?=@text('AN-PHOTOS-UPLOAD')?>" />
				</label>
			</div>
			
			<ul id="upload-list"></ul>
			<div class="an-se-buttons">
				<input type="submit"  id="an-photo-browse-images" class="an-se-button button an-se-hide" value="<?=@text('AN-PHOTOS-UPLOAD-CHOOSE-PHOTOS')?>" />
				<input type="button"  id="an-photo-upload" 		class="an-se-button button an-se-hide" value="<?=@text('AN-PHOTOS-UPLOAD')?>" />
			</div>
		</form>	
	</div>
</div>

<div class="an-se-message"><?= sprintf(@text('AN-PHOTOS-MAXIMUM-FILE-SIZE-ALLOWED-IS'), ini_get('upload_max_filesize')) ?></div>