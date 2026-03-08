import express from 'express';
import { supabase } from '../supabaseClient.js';
import { validateEnrollment } from '../middleware/validateEnrollment.js';

const router = express.Router();

// 1. Get All Courses
router.get('/courses', async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Enroll a Student
router.post('/enroll', validateEnrollment, async (req, res) => {
  try {
    const { student_name, course_id } = req.body;
    
    // Check if course exists
    const { data: courseData, error: courseError } = await supabase
      .from('courses').select('id').eq('id', course_id).single();
      
    if (courseError || !courseData) return res.status(400).json({ error: 'Invalid course_id' });

    const { data, error } = await supabase
      .from('enrollments').insert([{ student_name, course_id }]).select();
      
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0] || data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 3. Get Enrollments for a Course
router.get('/courses/:id/enrollments', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('enrollments').select('*').eq('course_id', id);
      
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;