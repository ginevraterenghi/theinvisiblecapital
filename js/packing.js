var platforms = [
    "apple",
    "facebook",
    "google",
    "instagram",
    "spotify",
    "twitter",
    "whatsapp"
]

function buildPacking(error, root, platform) {
    var svg = d3.select("#svg-" + platform),
        margin = 20,
        diameter = +svg.attr("width"),
        g = svg.append("g")
        .attr("id", "#g-" + platform)
        .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin])
        .padding(2);

    if (error) throw error;
    root = d3.hierarchy(root)
        .sum(function(d) {
            return d.size;
        })
        .sort(function(a, b) {
            return b.name - a.name;
        })

    var focus = root,
        nodes = pack(root).descendants(),
        view;

    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 20)
        .attr("class", function(d) {
            return d.parent ? d.children ? "node" : "node node--leaf " + d.data['format_file'] : "node node--root";
        })
        .style("stroke", function(d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function(d) {
            if (focus !== d) zoom(d), d3.event.stopPropagation();
        })
        .on("mouseover", function(d) {
            if(typeof d.data.format_file !== 'undefined'){
                $(".hover-etichetta").html(d.data.name + "." + d.data.format_file);
            } else {
                $(".hover-etichetta").html(d.data.name);
            }
        })
        .on("mouseout", function(d) {
            $(".hover-etichetta").html("");
        });



    var text = g.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("stroke-opacity", function(d) {
            return d.parent === root ? 1 : 0;
        })
        .style("display", "none")
        .text(function(d) {
            return d.data.name + "." + d.data.format_file;
        });

    var node = g.selectAll("circle,text");

    svg
        .style("background", "none")
        .on("click", function() {
            zoom(root);
            d3.selectAll('.node')
                .filter(function(d) {
                    current_node = d;
                    while (current_node.height > 0) {
                        current_node = current_node.children[0];
                    }
                    return (platform == current_node.data.platform_name);
                })
                .transition()
                .duration(750)
                .style("opacity", 1);
        });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
        console.log(d)
        var focus0 = focus;
        focus = d;
        var transition = d3.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function(d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function(t) {
                    zoomTo(i(t));
                };
            });

        current_node = focus;
        while (current_node.height > 0) {
            current_node = current_node.children[0];
        }
        current_brand = current_node.data.platform_name;

        transition.selectAll(".label")
            .filter(function(d) {
                current_node = d;
                while (current_node.height > 0) {
                    current_node = current_node.children[0];
                }
                if (current_brand != current_node.data.platform_name) return false;
                return d.height === 0;
            })
            .style("fill-opacity", function(d) {
                return d === focus ? 1 : 0;
            })
            .on("start", function(d) {
                if (d === focus) this.style.display = "inline";
            })
            .on("end", function(d) {
                if (d !== focus) this.style.display = "none";
            });

        transition.selectAll(".node")
            .filter(function(d) {
                if (d === focus) return false;
                if (d.depth > focus.depth) {
                    current_parent = d.parent;
                    while (0 < current_parent.depth) {
                        if (current_parent === focus) return false;
                        current_parent = current_parent.parent;
                    }
                }
                current_node = d;
                while (current_node.height > 0) {
                    current_node = current_node.children[0];
                }
                if (current_brand != current_node.data.platform_name) return false;
                return true;
            })
            .style("opacity", 0)
    }

    function zoomTo(v) {
        var k = diameter / v[2];
        view = v;
        node.attr("transform", function(d) {
            return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
        });
        circle.attr("r", function(d) {
            return d.r * k;
        });
        text.style("font-size", 2 * k);
    }
}

function pltPacking(platform) {
    d3.json("data/json/" + platform + ".json", function(error, root) {
        buildPacking(error, root, platform)
    });

}

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(360, 100%, 100%) ", "hsl(269, 100%, 38%)"])
    .interpolate(d3.interpolateHcl);

for (i = 0; i < 7; i++) {
    pltPacking(platforms[i]);
}