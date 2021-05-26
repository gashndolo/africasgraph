from django.shortcuts import render
from django.http import HttpResponse
import json
import os
import re
from pathlib import Path
from collections.abc import Iterable
import xml.etree.cElementTree as ET
def coupleUp(lis):
    # # # # Take a list ['a', 'b', 'c', 'd', 'e', 'f'] and turn it into [['a', 'b'], ['c', 'd'], ['e', 'f']]
	coupled_list = []
	new_list = []
	if isEven(len(lis)):
		while lis:
			new_list = []
			new_list.append(lis[0])
			new_list.append(lis[1])
			del lis[0:2]
			coupled_list.append(new_list)
		return coupled_list
	else:
		pass

def isEven(num):
	mod = num % 2
	if mod > 0:
		return False
	else:
		return True

def flatten(lis):
    # # # # Take a list with sublists and turn it into one long list
    for item in lis:
        if isinstance(item, Iterable) and not isinstance(item, str):
            for x in flatten(item):
                yield x
        else:
            yield item

def strs(lis):
	new_str = ""
	for ele in lis:
		new_str += str(ele[0]) + ',' + str(ele[1]) + ' '
	return new_str

def readPolygons(): 
    svg = ET.Element("svg")
    svg.set("width", "680")
    svg.set("height", "720")
    svg.set("id", "africamap")
    
    # # # # Access the .json file and extract the data # # # #
    BASE_DIR = Path(__file__).resolve().parent.parent
    directory = os.path.join(BASE_DIR, 'afro_stats', 'static', 'json')
    print(directory)
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            print(os.path.join(directory, filename))
            #continue

            # # # # Access the .json file and extract the data # # # #
            with open(str(os.path.join(directory, filename)), 'r') as datum:
                data = datum.read()
            obj = json.loads(data)
            # # # # End of JSON data access  # # # #

            # # # # Dictonary manipulation to extract the list of coordinates # # # #
            geometries = {key: obj[key] for key in obj.keys() & {'geometries'}}
            final_dict = geometries.get('geometries')[0]
            coordinates = {key: final_dict[key] for key in final_dict.keys() & {'coordinates'}}
            polygon_points = coordinates['coordinates']

            # if ever there's a need to couple up the coordinates like so [[1,2], [3,4]] break here to get the latitudes and longitudes
            final_polygon_points = coupleUp(list(flatten(polygon_points)))
            # for the rest of the function we are converting the lats and longitudes to a useable format for our project specifically
            
            def polygonToXML(lis):
                mapped_list = []
                for item in lis:
                    new_list = []
                    x = item[0] + 17
                    y = 37 - item[1] 
                    new_list.append(x)
                    new_list.append(y)
                    mapped_list.append(new_list)
                return mapped_list
            def factorPoints(n):
                return n * 10
            true_final_polygon_points = coupleUp(list(map(factorPoints, flatten(polygonToXML(final_polygon_points)))))
            print(len(true_final_polygon_points))
            poly = ET.SubElement(svg, 'polygon')
            poly.set('id', list(os.path.splitext(filename))[0])
            poly.set('class', "countries")
            poly.set('onmouseover', "expound('" + list(os.path.splitext(filename))[0] + "'" + ")")
            poly.set('points', strs(true_final_polygon_points))
            # # # # End of Dictonary manipulation  # # # #
        else:
            continue



    # # # #
    tree = ET.ElementTree(svg)
    tree.write('render_frontend/templates/render_frontend/svg.xml')

def data(request):
    readPolygons()
    return HttpResponse('data')