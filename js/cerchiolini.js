$(document).ready(function() {
    var cerchi = d3.selectAll(".cerchi");
    var dirty = d3.selectAll(".noisy");
    var clean = d3.selectAll(".clean");
    var dirtySwitch = false;
    dirty.style("opacity", 0);

    $('.filter').click(function() { 
        var color = $(this).attr("id");
        cerchi.transition()
            .duration(200)
            .style("opacity", 0);

        if (dirtySwitch) {
            dirty.filter("." + color)
                .transition()
                .duration(200)
                .style("opacity", 1);
        } else {
            clean.filter("." + color)
            .transition()
            .duration(200)
            .style("opacity", 1);
        }
    })

    $(".reset-filter").click(function() {
        if (dirtySwitch) {
            dirty.transition()
            .duration(200)
            .style("opacity", 1);
        } else {
            clean.transition()
            .duration(200)
            .style("opacity", 1);
        }
    })

    $("#dirty-switch, #dirty-switch-cont, .testo").click(function() {
        dirtySwitch = !dirtySwitch;
        if (dirtySwitch) {
            d3.select("#dirty-switch")
            .transition()
            .duration(200)
            .attr("x", 866.4)

            d3.select("#testo-on")
            .transition()
            .duration(200)
            .attr("fill", "#48fb47")

            d3.select("#testo-off")
            .transition()
            .duration(200)
            .attr("fill", "#b977ed")

            clean.transition()
            .duration(200)
            .style("opacity", 0);
            dirty.transition()
            .duration(200)
            .style("opacity", 1);
        } else {
            d3.select("#dirty-switch")
            .transition()
            .duration(200)
            .attr("x", 800.4)

            d3.select("#testo-on")
            .transition()
            .duration(200)
            .attr("fill", "#b977ed")

            d3.select("#testo-off")
            .transition()
            .duration(200)
            .attr("fill", "#48fb47")

            clean.transition()
            .duration(200)
            .style("opacity", 1);
            dirty.transition()
            .duration(200)
            .style("opacity", 0);
        }
        
    })
})