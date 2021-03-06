<?php
/**
 * @category	Helper
 * @package		JomSocial
 * @copyright (C) 2008 by Slashes & Dots Sdn Bhd - All rights reserved!
 * @license		GNU/GPL, see LICENSE.php
 */
Class CCalendar
{
	static public function generate_calendar($year, $month, $days = array(), $day_name_length = 3, $month_href = NULL, $first_day = 0, $pn = array()){
		
		$config = CFactory::getConfig();
		//set first day based on admin configuration
		if($config->get('event_calendar_firstday')  == 'Monday'){
			$first_day = 1;
		}else if($config->get('event_calendar_firstday')  == 'Sunday'){
			$first_day = 0;
		}
		
		$first_of_month = gmmktime(0,0,0,$month,1,$year);
		#remember that mktime will automatically correct if invalid dates are entered
		# for instance, mktime(0,0,0,12,32,1997) will be the date for Jan 1, 1998
		# this provides a built in "rounding" feature to generate_calendar()
		
		//highlight date
		$model	= CFactory::getModel( 'events' );
		$highlight_day = $model->getMonthlyEvents($month,$year);
		$temp_day = array();
		$all_day = array();//store all day with events within the month specified
		
		foreach($highlight_day as $day){
			$temp_day[] = $day->date_start;  // obj into one dimensional array
			for($i = (int)$day->date_start; $i < $day->date_end+1; $i++){
				if(!in_array($i,$all_day)){
					array_push($all_day,$i);
				}
			}
		}
		
		$highlight_day = $temp_day;
		
		$mainframe =& JFactory::getApplication();
		$systemOffset = $mainframe->getCfg('offset');
		
		$day_names = array(); #generate all the day names according to the current locale
		for($n=0,$t=(3+$first_day)*86400; $n<7; $n++,$t+=86400){ #January 4, 1970 was a Sunday
			$dayDate = new JDate($t,$systemOffset);
			$day_names[$n] = $dayDate->toFormat('%a', false); #%A means full textual day name
		}

		list($month, $year, $month_name, $weekday) = explode(',',gmstrftime('%m,%Y,%B,%w',$first_of_month));	
        
                $mainframe =& JFactory::getApplication();
                $systemOffset = $mainframe->getCfg('offset');
		$weekday = ($weekday + 7 - $first_day) % 7; #adjust for $first_day
		$monthDate = new JDate($first_of_month, $systemOffset);
                
		$month_name = $monthDate->toFormat('%B');
		$title   = $month_name.'&nbsp;'.$year;  #note that some locales don't capitalize month and day names
		
		#Begin calendar. Uses a real <caption>. See http://diveintomark.org/archives/2002/07/03
		@list($p, $pl) = each($pn); @list($n, $nl) = each($pn); #previous and next links, if applicable
		if($p) $p = '<span class="calendar-prev">'.($pl ? '<a href="'.htmlspecialchars($pl).'">'.$p.'</a>' : $p).'</span>&nbsp;';
		if($n) $n = '&nbsp;<span class="calendar-next">'.($nl ? '<a href="'.htmlspecialchars($nl).'">'.$n.'</a>' : $n).'</span>';
		$calendar = '<table class="calendar">'.
			'<tr><td colspan="7"><div class="calendar-month"><span class="calendar-prev"></span><span class="calendar-month">'.$p.($month_href ? '<a href="'.htmlspecialchars($month_href).'">'.$title.'</a>' : $title).$n.'</span><span class="calendar-next"></span></div></td></tr><tr>';


		if($day_name_length){ #if the day names should be shown ($day_name_length > 0)
			#if day_name_length is >3, the full name of the day will be printed
			foreach($day_names as $d){
				$day_name = mb_substr($d,0,$day_name_length,'UTF-8');
				$calendar .= '<th abbr="'.htmlentities($d).'">'.$day_name.'</th>';
			}
			$calendar .= "</tr>\n<tr>";
		}
		
		if($weekday > 0) $calendar .= '<td colspan="'.$weekday.'">&nbsp;</td>'; #initial 'empty' days
		for($day=1,$days_in_month=gmdate('t',$first_of_month); $day<=$days_in_month; $day++,$weekday++){
			//check if day is in the highlighted list
			$class = '';
			if(in_array((string)$day,$highlight_day)){
				$class = ' class="running event_date_'.$day.'" ';
			}else if(in_array((string)$day,$all_day)){
				$class = ' class="midrunning event_date_'.$day.'" ';
			}
			
			if($weekday == 7){
				$weekday   = 0; #start a new week
				$calendar .= "</tr>\n<tr>";
			}
			if(isset($days[$day]) and is_array($days[$day])){
				@list($link, $classes, $content) = $days[$day];
				if(is_null($content))  $content  = $day;
				$calendar .= '<td'.($classes ? ' class="'.htmlspecialchars($classes).'">' : '>').
					($link ? '<a href="'.htmlspecialchars($link).'">'.$content.'</a>' : $content).'</td>';
			}
			else $calendar .= "<td $class>$day</td>";
		}
		if($weekday != 7) $calendar .= '<td colspan="'.(7-$weekday).'">&nbsp;</td>'; #remaining "empty" days

		return $calendar."</tr>\n</table>\n<input class='cal-month-year' type='hidden' value='".$year.";".$month."'/>";
	}

}