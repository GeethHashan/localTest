// server/src/routes/simpleSearch.ts
import express, { Request, Response } from 'express';
import { prisma } from '../config/database';

const router = express.Router();

interface SearchRequest {
  query?: string;
  userQualifications?: any;
}

// POST /api/simple-search/courses - Basic course search
router.post('/courses', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, userQualifications }: SearchRequest = req.body;

    console.log('🔍 Simple search request:', { query, userQualifications });

    // For now, return mock data to test the connection
    const mockCourses = [
      {
        id: 1,
        name: 'Computer Science',
        specialisation: ['Software Engineering', 'Data Science'],
        courseCode: 'CS-001',
        courseUrl: 'https://cmb.ac.lk/faculty-of-science/computer-science',
        durationMonths: 48,
        description: 'Comprehensive computer science program covering programming, algorithms, and software development',
        studyMode: 'fulltime',
        courseType: 'internal',
        feeType: 'free',
        feeAmount: 0,
        university: {
          id: 1,
          name: 'University of Colombo',
          type: 'government'
        },
        faculty: {
          id: 1,
          name: 'Faculty of Science'
        }
      },
      {
        id: 2,
        name: 'Business Administration',
        specialisation: ['Management', 'Marketing', 'Finance'],
        courseCode: 'BBA-001',
        courseUrl: 'https://pdn.ac.lk/management/bba',
        durationMonths: 48,
        description: 'Bachelor of Business Administration with focus on modern business practices',
        studyMode: 'fulltime',
        courseType: 'internal',
        feeType: 'free',
        feeAmount: 0,
        university: {
          id: 2,
          name: 'University of Peradeniya',
          type: 'government'
        },
        faculty: {
          id: 2,
          name: 'Faculty of Management'
        }
      },
      {
        id: 3,
        name: 'Engineering - Electrical',
        specialisation: ['Power Systems', 'Electronics', 'Telecommunications'],
        courseCode: 'EE-001',
        courseUrl: 'https://mrt.ac.lk/engineering/electrical',
        durationMonths: 48,
        description: 'Bachelor of Engineering in Electrical Engineering',
        studyMode: 'fulltime',
        courseType: 'internal',
        feeType: 'free',
        feeAmount: 0,
        university: {
          id: 3,
          name: 'University of Moratuwa',
          type: 'government'
        },
        faculty: {
          id: 3,
          name: 'Faculty of Engineering'
        }
      },
      {
        id: 4,
        name: 'Medicine',
        specialisation: ['General Medicine'],
        courseCode: 'MBBS-001',
        courseUrl: 'https://med.cmb.ac.lk/medicine',
        durationMonths: 60,
        description: 'Bachelor of Medicine and Bachelor of Surgery',
        studyMode: 'fulltime',
        courseType: 'internal',
        feeType: 'free',
        feeAmount: 0,
        university: {
          id: 1,
          name: 'University of Colombo',
          type: 'government'
        },
        faculty: {
          id: 4,
          name: 'Faculty of Medicine'
        }
      }
    ];

    // Filter courses based on search query if provided
    let filteredCourses = mockCourses;
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredCourses = mockCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm) ||
        course.university.name.toLowerCase().includes(searchTerm) ||
        course.faculty.name.toLowerCase().includes(searchTerm) ||
        course.specialisation.some(spec => spec.toLowerCase().includes(searchTerm))
      );
    }

    console.log(`✅ Returning ${filteredCourses.length} courses for query: "${query}"`);

    res.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length,
      query: query
    });

  } catch (error: any) {
    console.error('❌ Simple search error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search courses',
      details: error.message
    });
  }
});

// GET /api/simple-search/test - Test endpoint
router.get('/test', (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: 'Simple search API is working!',
    timestamp: new Date().toISOString()
  });
});

export default router;