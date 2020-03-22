# tldr_text_blur_tool
This is a simple page design that allows for the text to be blurred, except for the highlights, until the user hovers their mouse or clicks the button.

Purpose: This is jquery tool that is used to highlight important text in an article or some other text field of a website. This text is embedded with the all of the text, but the remaining text is blurred until the user hovers their mouse or clicks the toggle button. 

Important: only monospaced font styles will work with this script as the blur mask needs exact dimensions to render properly.

This toggle button is provided by rcSwitcher https://github.com/ahmad-sa3d/rcswitcher

Usage: Create paragraph blocks (similar to those provided in the index.html page) with highlighted items using the 'no-blur' class and the blurred text using the 'blur' class tags. 
This will render only the 'no-blur' properly on-load. 
From here if the user hovers or clicks the toggle, then all the text will be non-blurred. 

Future: Wrap this into a tool that allows for the tagging/scripting of non-blur through an online editor (not in the html).

Enjoy.
