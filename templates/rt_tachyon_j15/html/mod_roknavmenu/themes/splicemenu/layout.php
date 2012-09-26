<?php
/**
 * @version   1.5.10 March 27, 2012
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */


// no direct access
defined('_JEXEC') or die('Restricted access');

class SpliceMenuLayout extends AbstractRokMenuLayout
{
    protected $theme_path;
    protected $params;

    private $activeid;

    public function __construct(&$args)
    {
        parent::__construct($args);
        global $gantry;
        $theme_rel_path = "/html/mod_roknavmenu/themes/splicemenu";
        $this->theme_path = $gantry->templatePath . $theme_rel_path;
        $this->args['theme_path'] = $this->theme_path;
        $this->args['theme_rel_path'] = $gantry->templateUrl. $theme_rel_path;
        $this->args['theme_url'] = $this->args['theme_rel_path'];
    }

    public function stageHeader()
    {
        global $gantry;

        //don't include class_sfx on 3rd level menu
        $this->args['class_sfx'] =  (array_key_exists('startlevel', $this->args) && $this->args['startLevel']==1) ? '' : $this->args['class_sfx'];
        $this->activeid = (array_key_exists('splicemenu_fusion_enable_current_id', $this->args) && $this->args['splicemenu_fusion_enable_current_id']== 0) ? false : true;

        JHTML::_('behavior.mootools');
        if ($this->isIe(6)) {
            $gantry->addScript(JURI::Root(true).'/modules/mod_roknavmenu/themes/fusion/js/sfhover.js');
        }
    }

    function isIe($version = false)
    {
        $agent=$_SERVER['HTTP_USER_AGENT'];
        $found = strpos($agent,'MSIE ');
        if ($found) {
                if ($version) {
                    $ieversion = substr(substr($agent,$found+5),0,1);
                    if ($ieversion == $version) return true;
                    else return false;
                } else {
                    return true;
                }

            } else {
                    return false;
            }
        if (stristr($agent, 'msie'.$ieversion)) return true;
        return false;
    }


    protected function renderItem(JoomlaRokMenuNode &$item, RokMenuNodeTree &$menu)
    {

        $item_params = new JParameter($item->getParams());
        //not so elegant solution to add subtext
        $item_subtext = $item_params->get('splicemenu_item_subtext','');
        if ($item_subtext=='') $item_subtext = false;
        else $item->addLinkClass('subtext');
        ?>
        <li <?php if($item->hasListItemClasses()) : ?>class="<?php echo $item->getListItemClasses()?>"<?php endif;?> <?php if($item->hasCssId() && $this->activeid):?>id="<?php echo $item->getCssId();?>"<?php endif;?>>
            <?php if ($item->getType() == 'menuitem') : ?>
                <a <?php if($item->hasLinkClasses()):?>class="<?php echo $item->getLinkClasses();?>"<?php endif;?> <?php if($item->hasLink()):?>href="<?php echo $item->getLink();?>"<?php endif;?> <?php if($item->hasTarget()):?>target="<?php echo $item->getTarget();?>"<?php endif;?> <?php if ($item->hasAttribute('onclick')): ?>onclick="<?php echo $item->getAttribute('onclick'); ?>"<?php endif; ?><?php if ($item->hasLinkAttribs()): ?> <?php echo $item->getLinkAttribs(); ?><?php endif; ?>>
                    <span>
                    <?php echo $item->getTitle();?>
                    <?php if (!empty($item_subtext)) :?>
                    <em><?php echo $item_subtext; ?></em>
                    <?php endif; ?>
                    </span>
                </a>
            <?php elseif($item->getType() == 'separator') : ?>
                <span <?php if($item->hasLinkClasses()):?>class="<?php echo $item->getLinkClasses();?> nolink"<?php endif;?>>
                    <span>
                    <?php echo $item->getTitle();?>
                    <?php if (!empty($item_subtext)) :?>
                    <em><?php echo $item_subtext; ?></em>
                    <?php endif; ?>
                    </span>
                </span>
            <?php endif; ?>
            <?php if ($item->hasChildren()): ?>
            <ul class="level<?php echo intval($item->getLevel())+2; ?>">
                <?php foreach ($item->getChildren() as $child) : ?>
                    <?php $this->renderItem($child, $menu); ?>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
        </li>
        <?php
    }


    public function renderMenu(&$menu) {
        $fulllevel = $this->args['fulllevel'];

        if (!$fulllevel)
            return $this->renderNormalMenu($menu);
        else
            return $this->renderFullLevelMenu($menu);
    }

    public function renderNormalMenu(&$menu){
        ob_start();
?>
<?php if ($menu->hasChildren()) : ?>
<div class="rt-splicemenu">
	<div class="rt-menubar">
	    <ul class="menu<?php echo $this->args['class_sfx']; ?> level1" <?php if(array_key_exists('tag_id',$this->args)):?>id="<?php echo $this->args['tag_id'];?>"<?php endif;?>>
	        <?php foreach ($menu->getChildren() as $item) :  ?>
	             <?php $this->renderItem($item, $menu); ?>
	        <?php endforeach; ?>
	    </ul>
		<div class="arrow-indicator"></div>
	</div>
</div>
<?php endif; ?>
<?php
        return ob_get_clean();
    }

    public function renderFullLevelMenu(&$menu){
        ob_start();
?>
<?php if ($menu->hasChildren()) : ?>
<div class="rt-splicemenu-children">
	<div class="rt-menubar">
		<div class="rt-menubar2">
	        <?php foreach($menu->getChildren() as $item) :  ?>
	        <?php if($item->hasChildren()) : ?>
	        <ul class="parent<?php if($item->hasListItemClasses()) : ?><?php echo $item->getListItemClasses()?> <?php endif;?>menu<?php echo $this->args['class_sfx']; ?> level1" <?php if($item->hasCssId()) : ?><?php endif;?>>
	            <?php foreach ($item->getChildren() as $subitem) :  ?>
	                 <?php $this->renderItem($subitem, $menu); ?>
	            <?php endforeach; ?>
	        </ul>
	        <?php endif; ?>
	        <?php endforeach; ?>
        </div>
	</div>
</div>
<?php endif; ?>
<?php
        return ob_get_clean();
    }
}