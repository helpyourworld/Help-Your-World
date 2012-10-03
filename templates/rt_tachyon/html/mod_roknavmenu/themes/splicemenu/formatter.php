<?php
/**
 * @version   1.6.8 August 14, 2012
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Rockettheme Tachyon Template uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

/**
 *
 */
class SpliceMenuFormatter extends AbstractJoomlaRokMenuFormatter
{
    function format_subnode(&$node)
    {
        // Format the current node

        if ($node->getType() == 'menuitem' or $node->getType() == 'separator')
        {
            if ($node->hasChildren())
            {
                $node->addLinkClass("daddy");
            } else
            {
                $node->addLinkClass("orphan");
            }

            $node->addLinkClass("item");
        }
    }


    /**
     * @param  $menu
     * @return void
     */
    protected function _default_format_menu(&$menu)
    {
        // Limit the levels of the tree is called for By limitLevels
        $fulllevel = $this->args['fulllevel'];

        $start = $this->args['startLevel'];
        $end = $this->args['endLevel'];
        $show_all_children = $this->args['showAllChildren'];
        $limit_levels = $this->args['limit_levels'];

        if ($fulllevel && $start > 0){
            $start = $start-1;
        }

        if ($limit_levels && !$fulllevel)
        {
            {
                //Limit to the active path if the start is more the level 0
                if ($start > 0)
                {
                    $found = false;
                    // get active path and find the start level that matches
                    if (count($this->active_branch))
                    {
                        foreach ($this->active_branch as $active_child)
                        {
                            if ($active_child->getLevel() == $start - 1)
                            {
                                $menu->resetTop($active_child->getId());
                                $found = true;
                                break;
                            }
                        }
                    }
                    if (!$found)
                    {
                        $menu->setChildren(array());
                    }
                }
            }
            //remove lower then the defined end level
            $menu->removeLevel($end);
        }
        elseif($limit_levels && $fulllevel){
            $menu->removeLevel($end);
        }

        if (!$show_all_children)
        {
            if ($menu->hasChildren())
            {
                $active = array_keys($this->active_branch);
                foreach ($menu->getChildren() as $toplevel)
                {
                    if (array_key_exists($toplevel->getId(), $this->active_branch) !== false)
                    {
                        end($active);
                        $menu->removeIfNotInTree($active, current($active));
                    }
                    else
                    {
                        if (count($this->active_branch) > 0)
                            $menu->removeLevelFromNonActive($this->active_branch, end($this->active_branch)->getLevel());
                    }
                }
            }
        }
    }

}