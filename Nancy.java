/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nancy;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Desktop;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;
import static javafx.scene.paint.Color.color;
import static javafx.scene.paint.Color.color;
import static javafx.scene.paint.Color.color;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

/**
 *
 * @author Yue Linn Chong
 */

public class Nancy {
    private JFrame frame;
    private JPanel panel; //displays the frame items
    private JButton b1;
    private JButton b2;
    private JLabel title;
    private Color bg;
    
    //constructor
    public Nancy()
    {
        //GUI
        gui();
    }
    
    private void gui()
    {
       //start page
        //create frame
        frame = new JFrame();
       
//        frame.setSize(600,400); //set width and height
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); //"x" button will close the frame
        try
        {
            frame.setExtendedState(JFrame.MAXIMIZED_BOTH); 
            //frame.setUndecorated(true);         
        }catch(Exception e)
        {
            Logger.getLogger(Nancy.class.getName()).log(Level.SEVERE, null, e);
        }
       
        //create panel
        //bg = new Color(255, 250, 240);
        bg = new Color(255, 248, 220);        
        panel = new JPanel(new GridBagLayout()); //using grid back layout
        panel.setBackground(bg); //set color
        
        //create obj of button and label
        b1= new JButton("Youtube");
        b1.setFont(new Font ("Serif", Font.BOLD, 60));
        b1.addActionListener((ActionEvent e) -> {
            //the action when clicked button
            if(Desktop.isDesktopSupported())
            {
                try {
                    Desktop.getDesktop().browse(new URI("http://localhost/youtubeProxy.html"));
                } catch (Exception ex) {
                    Logger.getLogger(Nancy.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        });
        
        b2= new JButton("Help");
        b2.setFont(new Font ("Serif", Font.BOLD, 60));
        
         b2.addActionListener(new ActionListener()
        {
                public void actionPerformed(ActionEvent e)
                {
                        //the action when clicked button
                        JOptionPane.showMessageDialog(null, "the message in the box"); // shows a box message
                }
        });
        
        title = new JLabel("What would you like to do?");
        title.setFont(new Font ("Serif", Font.BOLD, 80));
        //grid things
        GridBagConstraints c = new GridBagConstraints();
        c.insets = new Insets(30,30,30,30); // to have spacing between grids

        //add obj to panel
        c.gridx = 0; //x pos to 0
        c.gridy = 1;
        panel.add(title, c);

        c.gridx = 0; //ontop of the other guy
        c.gridy = 3; 
	panel.add(b1, c);
        
        c.gridx = 0; //ontop of the other guy
        c.gridy = 4; 
	panel.add(b2, c);
        
        frame.add(panel);
        
        frame.setVisible(true); //set the frame to be visible. for some reason, putting it here makes things work but putting it earlier displays nothing
        
        //using only up and down keys
        frame.getRootPane().setDefaultButton(b1);
        
        b2.requestFocus();
    }
    
    public static void main(String[] args) {
        // TODO code application logic here
        new Nancy();
    }
}
