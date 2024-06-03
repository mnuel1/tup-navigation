input_data = [
    { "start": { "x": 580, "y": 460, "label": '349' }, "end": { "x": 583, "y": 467, "label": '303' }, "active": False },
      { "start": { "x": 590, "y": 446, "label": '348' }, "end": { "x": 596, "y": 451, "label": '365' }, "active": False },
      { "start": { "x": 590, "y": 446, "label": '348' }, "end": { "x": 580, "y": 460, "label": '349' }, "active": False },
      { "start": { "x": 601, "y": 430, "label": '347' }, "end": { "x": 607, "y": 436, "label": '364' }, "active": False },
      { "start": { "x": 601, "y": 430, "label": '347' }, "end": { "x": 590, "y": 446, "label": '348' }, "active": False },
      { "start": { "x": 609, "y": 420, "label": '346' }, "end": { "x": 618, "y": 423, "label": '363' }, "active": False },
      { "start": { "x": 609, "y": 420, "label": '346' }, "end": { "x": 601, "y": 430, "label": '347' }, "active": False }, 
      { "start": { "x": 603, "y": 410, "label": '345' }, "end": { "x": 609, "y": 420, "label": '346' }, "active": False },
      { "start": { "x": 591, "y": 408, "label": '344' }, "end": { "x": 581, "y": 404, "label": '362' }, "active": False },
      { "start": { "x": 591, "y": 408, "label": '344' }, "end": { "x": 603, "y": 410, "label": '345' }, "active": False },
      { "start": { "x": 581, "y": 422, "label": '343' }, "end": { "x": 573, "y": 416, "label": '361' }, "active": False },
      { "start": { "x": 581, "y": 422, "label": '343' }, "end": { "x": 591, "y": 408, "label": '344' }, "active": False },
      { "start": { "x": 570, "y": 436, "label": '342' }, "end": { "x": 562, "y": 430, "label": '360' }, "active": False },
      { "start": { "x": 570, "y": 436, "label": '342' }, "end": { "x": 581, "y": 422, "label": '343' }, "active": False },
      { "start": { "x": 560, "y": 450, "label": '341' }, "end": { "x": 551, "y": 446, "label": '359' }, "active": False },
      { "start": { "x": 560, "y": 450, "label": '341' }, "end": { "x": 570, "y": 436, "label": '342' }, "active": False },
      { "start": { "x": 548, "y": 464, "label": '340' }, "end": { "x": 540, "y": 462, "label": '358' }, "active": False },
      { "start": { "x": 548, "y": 464, "label": '340' }, "end": { "x": 560, "y": 450, "label": '341' }, "active": False },
      { "start": { "x": 539, "y": 479, "label": '339' }, "end": { "x": 539, "y": 479, "label": '354' }, "active": False },
      { "start": { "x": 539, "y": 479, "label": '339' }, "end": { "x": 548, "y": 464, "label": '340' }, "active": False },
      { "start": { "x": 534, "y": 493, "label": '338' }, "end": { "x": 539, "y": 479, "label": '339' }, "active": False },
      { "start": { "x": 539, "y": 503, "label": '337' }, "end": { "x": 533, "y": 507, "label": '353' }, "active": False },
      { "start": { "x": 539, "y": 503, "label": '337' }, "end": { "x": 534, "y": 493, "label": '338' }, "active": False },
      { "start": { "x": 546, "y": 517, "label": '336' }, "end": { "x": 534, "y": 525, "label": '350' }, "active": False },
      { "start": { "x": 546, "y": 517, "label": '336' }, "end": { "x": 539, "y": 503, "label": '337' }, "active": False },      
      { "start": { "x": 570, "y": 475, "label": '335' }, "end": { "x": 578, "y": 482, "label": '366' }, "active": False },
      { "start": { "x": 570, "y": 475, "label": '335' }, "end": { "x": 562, "y": 478, "label": '357' }, "active": False },
      { "start": { "x": 570, "y": 475, "label": '335' }, "end": { "x": 588, "y": 472, "label": '352' }, "active": False },
      { "start": { "x": 570, "y": 475, "label": '335' }, "end": { "x": 580, "y": 460, "label": '349' }, "active": False },
      { "start": { "x": 570, "y": 475, "label": '335' }, "end": { "x": 548, "y": 464, "label": '340' }, "active": False },      
      { "start": { "x": 570, "y": 490, "label": '334' }, "end": { "x": 562, "y": 490, "label": '356' }, "active": False },
      { "start": { "x": 570, "y": 490, "label": '334' }, "end": { "x": 570, "y": 475, "label": '335' }, "active": False },      
      { "start": { "x": 571, "y": 515, "label": '333' }, "end": { "x": 562, "y": 508, "label": '355' }, "active": False },
      { "start": { "x": 571, "y": 515, "label": '333' }, "end": { "x": 546, "y": 517, "label": '336' }, "active": False },
      { "start": { "x": 571, "y": 515, "label": '333' }, "end": { "x": 570, "y": 490, "label": '334' }, "active": False },
]

def increment_labels(data_list):
    for data in data_list:
        data["start"]["label"] = str(int(data["start"]["label"]) + 1)
        data["end"]["label"] = str(int(data["end"]["label"]) + 1)

def format_data(data):
    formatted_data = "{ start: " + str(data["start"]) + ", end: " + str(data["end"]) + ", active: " + str(data["active"]) + " },"
    return formatted_data

increment_labels(input_data)

# Save the updated data to a text file
with open("output.txt", "w") as txt_file:
    for data in input_data:
        formatted_data = format_data(data)
        txt_file.write(formatted_data + "\n")

print("Data saved to output.txt")
