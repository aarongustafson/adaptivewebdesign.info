<?php

# get the config
include_once "{$_SERVER['DOCUMENT_ROOT']}/global/.config.php";

$fields	=	'';
$html		=	'';

$requested		=	$_GET['fields'];
$count				= $_GET['count'];
$attendee_key	=	$_GET['attendee_key'];

if (	! empty( $requested ) &&
			is_numeric( $attendee_key ) &&
			! empty( $count ) &&
			in_array( $requested, array_keys( $REG_FIELDS ) ) )
{
	$fields = $REG_FIELDS[$requested];
}

if ( is_array( $fields ) )
{
	$html = '';
	switch ( $requested )
	{
		case 'attendee':
			$total = $attendee_key + $count;
			$fieldsets = array();
			while ( $count-- )
			{
				$current = $total - $count;
				$fieldsets[]	= array(
					'legend'	=>	"Attendee {$current}",
					'id'			=>	"attendee-{$current}",
					'fields'	=>	$fields,
					'prefix'	=>	"attendee[{$current}]"
				);
			}
			$html = create_fieldsets( $fieldsets );
			break;
		case 'guest':
		  $currently	=	$_GET['currently'];
			$total 			= $currently + $count;
			while ( $count-- )
			{
				$current = $total - $count;
				$html .= create_fields( 
					array(
						"guest:{$current}"	=>	$fields
					),
					array(), array(),
					"attendee[{$attendee_key}]"
				);
			}
			break;
	}
}

echo $html;