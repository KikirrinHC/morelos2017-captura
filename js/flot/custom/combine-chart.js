var $border_color = "#f9f9f9";
var $grid_color = "#eeeeee";
var $default_black = "#666666";
var $default_white = "#ffffff";
var $green = "#8ecf67";
var $blue = "#12A4F4";

$(function () {    
    var data = [['Mucho', 127], ['Poco', 259], ['Nada', 148]];

 $.plot("#combineChart", [ data ], {
    	series: {
				bars: {
					show: true,
					barWidth: 0.6,
					align: "center"
				}
			},
        grid: {
				hoverable: true,
				clickable: false,
				borderWidth: 1,
				tickColor: $border_color,
				borderColor: $grid_color,
				backgroundColor: { colors: [$default_white, $default_white] }
			},
			legend:{   
				show: true,
				position: 'nw',
				noColumns: 0,
			},
			tooltip: true,
			tooltipOpts: {
				content: '%y'
			},

			xaxis: {
				mode: "categories",
				tickLength: 0
			},
			colors: [$blue],
    });
});