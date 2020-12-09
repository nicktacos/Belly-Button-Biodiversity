function grabData(id) {
    d3.json("samples.json").then (sdata =>{
        var ids = sdata.samples[0].otu_ids;
        var values = sdata.samples[0].sample_values.slice(0,10).reverse();
        var labels = sdata.samples[0].otu_labels.slice(0,10);
        console.log(ids);
        console.log(values);
        console.log(labels);
        var topOTU = (sdata.samples[0].otu_ids.slice(0, 10)).reverse();
        var idOTU = topOTU.map(d => "OTU " + d);
        console.log(`OTU IDS: ${idOTU}`)
        var labels = sdata.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU Labels: ${labels}`)
        var trace = {
            x: values,
            y: idOTU,
            text: labels,
            marker: {color: 'blue'},
            type: "bar",
            orientation: "h",
        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTU",
            yaxis:{tickmode: "linear"},
            margin: {l:100, r:100, t:100, b:30}
        };
    Plotly.newPlot("bar", data, layout);

        var trace1 = {
            x: sdata.samples[0].otu_ids,
            y: sdata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sdata.samples[0].sample_values,
                color: sdata.samples[0].otu_ids
            },
            text: sdata.samples[0].otu_labels
        };
        var layout1 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };
        var data1 = [trace1];
    Plotly.newPlot("bubble", data1, layout1);

    });
}
function Demo(id){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        Object.entries(result).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
function optionChanged(id){
    grabData(id);
    Demo(id);
}
function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        grabData(data.names[0]);
        Demo(data.names[0]);
    });
}
init();
