<?php
/**
 * @version		1.9 March 13, 2012
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 */
defined('JPATH_BASE') or die;

jimport('joomla.form.formfield');

/**
 * @package     gantry
 * @subpackage  admin.elements
 */
class JFormFieldEventListCategory extends JFormField
{
	var	$type = 'EventListCategory';

	function getInput()
	{
        $class = ($this->element['class'] ? 'class="' . $this->element['class'] . '"' : 'class="inputbox"');

        $db			=& JFactory::getDBO();
        $query = 'SELECT id, catname as name from #__eventlist_categories where published = 1 order by ordering';

        $db->setQuery($query);
		$categories = $db->loadObjectList();

		$options = array();
        $options[] = JHTML::_('select.option', 0, '--');
		foreach ($categories as $option)
		{
			$options[] = JHTML::_('select.option', $option->id, $option->name);
		}
        return JHTML::_('select.genericlist',  $options, $this->name, $class, 'value', 'text', $this->value, $this->name );
	}
}
