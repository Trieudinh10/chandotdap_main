window.onload = function () {

var chart1 = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    title: {
        text: "Biểu Đồ Hiệu Suất Các Thiết Bị Chấn Đột Dập",
        fontSize: 20, // Set the font size for the title,
        fontFamily: 'Be Vietnam Pro, sans-serif' // Set the font family for the title
    },
        axisY: {
            title: "Thời gian hoạt động",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Thời gian dừng",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },	
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Proven Oil Reserves (bn)",
            legendText: "Thời gian hoạt động",
            showInLegend: true, 
            color: "rgba(197, 112, 0,0.8)",
            dataPoints:[
                { label: "M01", y: 500.21 },
                { label: "M02", y: 302.25 },
                { label: "M03", y: 157.20 },
                { label: "M04", y: 148.77 },
                { label: "M05", y: 101.50 },
                { label: "M06", y: 97.8 },
                { label: "M07", y: 101.50 },
                { label: "M08", y: 201.50 },
                { label: "M09", y: 190.50 },
                { label: "M10", y: 300.50 },
                { label: "M11", y: 1000 },
                { label: "M12", y: 787.50 },
                { label: "M13", y: 673.50 },
                { label: "M14", y: 111.50 },
                { label: "M15", y: 800.50 }
            ]
        },
        {
            type: "column",	
            name: "Oil Production (million/day)",
            legendText: "Thời gian dừng",
            axisYType: "secondary",
            showInLegend: true,
            color: "rgba(0, 204, 255,0.8)",
            dataPoints:[
                { label: "M01", y: 900.46 },
                { label: "M02", y: 80.27 },
                { label: "M03", y: 200.99 },
                { label: "M04", y: 400.45 },
                { label: "M05", y: 122.92 },
                { label: "M06", y: 390.1 },
                { label: "M07", y: 101.50 },
                { label: "M08", y: 321.50 },
                { label: "M09", y: 540.50 },
                { label: "M10", y: 821.50 },
                { label: "M11", y: 101.50 },
                { label: "M12", y: 647.50 },
                { label: "M13", y: 1000 },
                { label: "M14", y: 416.50 },
                { label: "M15", y: 520.50 }
            ]
        }]
    });
    chart1.render();
    
    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart1.render();
    }
    
    /////////////////////////////////////////////////////////////////****///////////////////////////////////////////////////////////////////////
    var chart2 = new CanvasJS.Chart("chartContainer2", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Biểu Đồ Hoạt Động Máy 10",
            fontSize: 20, // Set the font size for the title
            fontFamily: 'Be Vietnam Pro, sans-serif'
        },
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}%</strong>",
            indexLabel: "{name} - {y}%",
            dataPoints: [
                { y: 26, name: "Thời gian lắp khuôn", exploded: true, color: '#FE6384'},
                { y: 20, name: "Lỗi", color: '#36A2EB'},
                { y: 30, name: "Thời gian làm việc", color: '#4BC0C0'},
                { y: 24, name: "Thời gian nghỉ", color: '#FFCD56'}
            ]
        }]
    });
    chart2.render();
    }
    
    function explodePie (e) {
        if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    
    }


