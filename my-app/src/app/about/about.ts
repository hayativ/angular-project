import { Component } from '@angular/core';


@Component({
    selector: 'app-about',
    standalone: true,
    imports: [],
    templateUrl: './about.html',
    styleUrl: './about.css'
})
export class About {
    title = 'About the Art Institute of Chicago';
    foundedYear = '1879';
    collectionSize = '300,000+';

    facts = [
        {
            title: 'World-Class Collection',
            description: 'Home to iconic works including Grant Wood\'s "American Gothic" and Georges Seurat\'s "A Sunday on La Grande Jatte"'
        },
        {
            title: 'Historic Institution',
            description: 'Founded in 1879, the museum is one of the oldest and largest art museums in the United States'
        },
        {
            title: 'Diverse Exhibits',
            description: 'Features art spanning 5,000 years from cultures around the world, including paintings, sculptures, textiles, and more'
        },
        {
            title: 'Educational Mission',
            description: 'Committed to inspiring curiosity and fostering understanding through art and education programs'
        }
    ];

    schedule = {
        weekdays: 'Monday - Friday: 10:00 AM - 8:00 PM',
        weekends: 'Saturday - Sunday: 10:00 AM - 5:00 PM'
    };
}
