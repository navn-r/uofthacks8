import csv


name = "./db/data/food_nutrient"
with open(f"{name}.csv", encoding="utf-8") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    with open(f"{name}_cpy.csv", "w", newline="", encoding="utf-8") as open_file:
        write = csv.writer(
            open_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for row in csv_reader:
            if (row[2] not in ("1111", "1112", "1110", "1114", "1162", "1178", "1175", "1106", "1104")):
                write.writerow(row)
