def add_double_newlines():
    # Ask user for input file
    input_file = input("Enter the name of the .txt file (with extension): ").strip()
    
    # Create output file name
    if input_file.endswith(".txt"):
        output_file = input_file.replace(".txt", "_modified.txt")
    else:
        output_file = input_file + "_modified.txt"

    try:
        with open(input_file, "r", encoding="utf-8") as infile:
            lines = infile.readlines()

        # Add two newlines to each line
        modified_lines = [line.rstrip("\n") + "\n\n" for line in lines]

        with open(output_file, "w", encoding="utf-8") as outfile:
            outfile.writelines(modified_lines)

        print(f"Done! Modified file saved as: {output_file}")

    except FileNotFoundError:
        print("File not found. Make sure the name is correct.")


if __name__ == "__main__":
    add_double_newlines()