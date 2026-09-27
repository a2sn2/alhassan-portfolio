# Import necessary modules
import tkinter as tk  # GUI library
from tkinter import scrolledtext, ttk, messagebox, filedialog  # Specific components from tkinter
from tkinter import font as tkfont  # Font module
from nltk.corpus import stopwords  # NLTK for natural language processing
from nltk.tokenize import word_tokenize, sent_tokenize  # Tokenization functions
from nltk.probability import FreqDist  # Frequency distribution
import heapq  # Heap queue algorithm
import nltk  # Natural language processing toolkit
from constraint import Problem, AllDifferentConstraint  # Constraint solver

# Download NLTK stopwords
nltk.download('stopwords')

# Define the TextSummarizerApp class
class TextSummarizerApp:
    def __init__(self, master):
        self.master = master  # Reference to the Tkinter master window
        master.title("Text Summarizer")  # Set the title of the master window

        # Define custom dark theme colors
        bg_color = "#222222"  # Background color
        fg_color = "#ffffff"  # Foreground color
        text_color = "#000000"  # Text color

        # Define custom font
        custom_font = tkfont.Font(family="Helvetica", size=12)  # Custom font details

        master.config(bg=bg_color)  # Configure the background color of the master window

        # Create a scrolled text area for input
        self.text_area = scrolledtext.ScrolledText(master, wrap=tk.WORD, width=60, height=15, bg=text_color,
                                                   fg=fg_color, font=custom_font)  # Create a scrolled text widget
        self.text_area.pack(padx=10, pady=10)  # Pack the text area into the master window with padding

        # Add buttons
        self.button_frame = tk.Frame(master, bg=bg_color)  # Create a frame for buttons
        self.button_frame.pack()  # Pack the frame into the master window

        # Load Text button
        self.load_button = tk.Button(self.button_frame, text="Load Text", command=self.load_text, bg="#333333",
                                     fg=fg_color, font=custom_font)  # Create Load Text button
        self.load_button.pack(side=tk.LEFT, padx=5, pady=5)  # Pack the button into the frame with padding

        # Save Summary button
        self.save_button = tk.Button(self.button_frame, text="Save Summary", command=self.save_summary, bg="#333333",
                                     fg=fg_color, font=custom_font)  # Create Save Summary button
        self.save_button.pack(side=tk.LEFT, padx=5, pady=5)  # Pack the button into the frame with padding

        # Clear button
        self.clear_button = tk.Button(self.button_frame, text="Clear", command=self.clear_all, bg="#333333",
                                      fg=fg_color, font=custom_font)  # Create Clear button
        self.clear_button.pack(side=tk.LEFT, padx=5, pady=5)  # Pack the button into the frame with padding

        # Summarize button
        self.summarize_button = tk.Button(self.button_frame, text="Summarize", command=self.summarize_text,
                                          bg="#333333", fg=fg_color, font=custom_font)  # Create Summarize button
        self.summarize_button.pack(side=tk.LEFT, padx=5, pady=5)  # Pack the button into the frame with padding

        # Add summary label and text area
        self.summary_label = tk.Label(master, text="Summary:", bg=bg_color, fg=fg_color, font=custom_font)  # Create Summary label
        self.summary_label.pack()  # Pack the label into the master window

        self.summary_text = tk.Text(master, wrap=tk.WORD, width=60, height=5, bg=text_color, fg=fg_color,
                                     font=custom_font)  # Create a text area for the summary
        self.summary_text.pack(padx=10, pady=5)  # Pack the text area into the master window with padding

        # Add combobox for selecting number of sentences
        self.sentences_label = tk.Label(master, text="Select number of sentences (3-10):", bg=bg_color, fg=fg_color,
                                        font=custom_font)  # Create label for selecting number of sentences
        self.sentences_label.pack()  # Pack the label into the master window

        self.sentences_var = tk.StringVar()  # Variable to store selected number of sentences
        self.sentences_var.set("3")  # Default value
        self.sentences_combobox = ttk.Combobox(master, textvariable=self.sentences_var,
                                               values=[str(i) for i in range(3, 11)], font=custom_font)  # Create combobox for selecting sentences
        self.sentences_combobox.pack()  # Pack the combobox into the master window

        # Add constraint entry
        self.constraint_entry = tk.Entry(master, bg=text_color, fg=fg_color, font=custom_font)  # Create entry for constraints
        self.constraint_entry.pack(padx=10, pady=5)  # Pack the entry into the master window with padding
        self.constraint_entry.insert(tk.END, "Enter constraint here")  # Insert default text into the entry

    # Method to load text from a file
    def load_text(self):
        file_path = filedialog.askopenfilename(filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")])  # Open file dialog to select text file
        if file_path:  # If a file path is provided
            try:
                with open(file_path, "r") as file:  # Open the file in read mode
                    text = file.read()  # Read the content of the file
                    self.text_area.delete("1.0", tk.END)  # Clear the text area
                    self.text_area.insert(tk.END, text)  # Insert the text into the text area
            except Exception as e:
                messagebox.showerror("Error", str(e))  # Show error message if file cannot be opened

    # Method to save the summary to a file
    def save_summary(self):
        summary = self.summary_text.get("1.0", tk.END)  # Get the summary text
        if summary.strip():  # If the summary is not empty
            file_path = filedialog.asksaveasfilename(defaultextension=".txt",  # Open file dialog to select save location
                                                     filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")])
            if file_path:  # If a file path is provided
                try:
                    with open(file_path, "w") as file:  # Open the file in write mode
                        file.write(summary)  # Write the summary text to the file
                    messagebox.showinfo("Info", "Summary saved successfully.")  # Show info message
                except Exception as e:
                    messagebox.showerror("Error", str(e))  # Show error message if file cannot be saved
        else:
            messagebox.showwarning("Warning", "No summary to save.")  # Show warning if there's no summary to save

    # Method to clear all text areas
    def clear_all(self):
        self.text_area.delete("1.0", tk.END)  # Clear input text area
        self.summary_text.delete("1.0", tk.END)  # Clear summary text area

    # Method to summarize the text
    def summarize_text(self):
        text = self.text_area.get("1.0", tk.END)  # Get the input text
        if not text.strip():  # If the input text is empty
            messagebox.showwarning("Warning", "No text to summarize.")  # Show warning message
            return

        num_sentences = int(self.sentences_var.get())  # Get the selected number of sentences
        sentences = sent_tokenize(text)  # Tokenize the text into sentences
        word_frequencies = self.calculate_word_frequencies(text)  # Calculate word frequencies
        sentence_scores = self.calculate_sentence_scores(sentences, word_frequencies)  # Calculate sentence scores

        # Extract constraints from entry
        constraint_text = self.constraint_entry.get()
        constraints = constraint_text.split(",")
        constraints = [c.strip() for c in constraints if c.strip()]

        # Apply constraints
        filtered_sentences = [sentence for sentence in sentences if all(constraint in sentence for constraint in constraints)]

        # If no sentences satisfy the constraints, fall back to original sentences
        if not filtered_sentences:
            filtered_sentences = sentences

        # Generate summary from filtered sentences
        summary_sentences = heapq.nlargest(num_sentences, filtered_sentences, key=sentence_scores.get)
        summary = ' '.join(summary_sentences)
        self.summary_text.delete("1.0", tk.END)
        self.summary_text.insert(tk.END, summary)

    # Method to calculate word frequencies
    def calculate_word_frequencies(self, text):
        stop_words = set(stopwords.words("english"))  # Get English stop words
        word_tokens = word_tokenize(text.lower())  # Tokenize words
        filtered_words = [word for word in word_tokens if word.isalnum() and word not in stop_words]  # Remove stop words and non-alphanumeric characters
        word_frequencies = FreqDist(filtered_words)  # Calculate word frequencies
        return word_frequencies

    # Method to calculate sentence scores
    def calculate_sentence_scores(self, sentences, word_frequencies):
        sentence_scores = {}  # Initialize dictionary to store sentence scores
        for sentence in sentences:
            word_count_in_sentence = len(word_tokenize(sentence.lower()))  # Count words in the sentence
            for word in word_tokenize(sentence.lower()):  # Iterate through words in the sentence
                if word in word_frequencies:  # If the word is in the word frequencies dictionary
                    if sentence not in sentence_scores:  # If the sentence is not in the scores dictionary
                        sentence_scores[sentence] = word_frequencies[word]  # Add word frequency to sentence score
                    else:
                        sentence_scores[sentence] += word_frequencies[word]  # Update sentence score
            if sentence in sentence_scores:
                sentence_scores[sentence] = sentence_scores[sentence] / word_count_in_sentence  # Normalize sentence score by word count
        return sentence_scores  # Return the sentence scores

# Define the WelcomeWindow class
class WelcomeWindow:
    def __init__(self, master):
        self.master = master  # Reference to the Tkinter master window
        master.title("Welcome to Text Summarizer")  # Set the title of the master window

        # Define custom dark theme colors
        bg_color = "#222222"  # Background color
        fg_color = "#ffffff"  # Foreground color

        # Define custom font
        custom_font = ("Helvetica", 12)  # Custom font details

        master.config(bg=bg_color)  # Configure the background color of the master window

        # Welcome message
        self.welcome_label = tk.Label(master, text="Welcome to Text Summarizer", bg=bg_color, fg=fg_color,
                                      font=("Helvetica", 18, "bold"))  # Create welcome label
        self.welcome_label.pack(pady=20)  # Pack the label into the master window with padding

        # Explanation message
        explanation_text = "This application helps you summarize text documents. Follow these steps to get started:\n\n" \
                           "1. Click the 'Load Text' button to select a text file.\n" \
                           "2. Optionally, enter any constraints (keywords) in the constraint entry.\n" \
                           "3. Select the number of sentences for the summary.\n" \
                           "4. Click the 'Summarize' button to generate the summary.\n" \
                           "5. You can save the summary using the 'Save Summary' button.\n" \
                           "6. Use the 'Clear' button to clear the text areas."  # Explanation text

        self.explanation_label = tk.Label(master, text=explanation_text, bg=bg_color, fg=fg_color,
                                          font=custom_font, justify=tk.LEFT)  # Create explanation label
        self.explanation_label.pack(padx=20, pady=10)  # Pack the label into the master window with padding

        # Close button
        self.close_button = tk.Button(master, text="Close", command=master.destroy, bg="#333333",
                                      fg=fg_color, font=("Helvetica", 12))  # Create close button
        self.close_button.pack(pady=20, padx=10, ipadx=10)  # Pack the button into the master window with padding

# Main function to create and run the application
def main():
    welcome_root = tk.Tk()  # Create Tkinter welcome window
    welcome_app = WelcomeWindow(welcome_root)  # Create WelcomeWindow instance
    welcome_root.mainloop()  # Run the main event loop for the welcome window

    root = tk.Tk()  # Create Tkinter main window
    app = TextSummarizerApp(root)  # Create TextSummarizerApp instance
    root.mainloop()  # Run the main event loop for the main window

# Check if the script is run as the main program
if __name__ == "__main__":
    main()  # Call the main function
