import express from "express";
import supabase from "../supabaseClient.js";
import validateEnrollment from "../middleware/validateEnrollment.js";

const router = express.Router();

/* GET /courses */
router.get("/", async (req, res) => {

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("id", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

/* POST /enroll */
router.post("/enroll", validateEnrollment, async (req, res) => {

  const { student_name, course_id } = req.body;

  const { data, error } = await supabase
    .from("enrollments")
    .insert([{ student_name, course_id }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

/* GET /courses/:id/enrollments */
router.get("/:id/enrollments", async (req, res) => {

  const { id } = req.params;

  const { data, error } = await supabase
    .from("enrollments")
    .select(`
      id,
      student_name,
      course_id
    `)
    .eq("course_id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
});

export default router;
