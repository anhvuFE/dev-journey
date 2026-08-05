// Chứng chỉ THẬT (từ LinkedIn của Vũ Xuân Anh). Sắp xếp mới → cũ.
export interface Certificate {
  title: string;
  issuer: string;
  date: string; // MM/YYYY
  year: number;
}

export const certificates: Certificate[] = [
  { title: "Backend Development: Node.js, Express, MongoDB & REST APIs", issuer: "Board Infinity", date: "02/2026", year: 2026 },
  { title: "AWS Cloud Solutions Architect", issuer: "Amazon Web Services", date: "02/2026", year: 2026 },
  { title: "User Experience Research and Design Specialization", issuer: "University of Michigan", date: "07/2024", year: 2024 },
  { title: "Project Management Principles and Practices Specialization", issuer: "University of California, Irvine", date: "05/2024", year: 2024 },
  { title: "Academic English: Writing Specialization", issuer: "University of California, Irvine", date: "01/2024", year: 2024 },
  { title: "CertNexus Certified Ethical Emerging Technologist Specialization", issuer: "CertNexus", date: "05/2023", year: 2023 },
  { title: "Software Development Lifecycle Specialization", issuer: "University of Minnesota", date: "02/2023", year: 2023 },
  { title: "Web Design for Everybody: Basics of Web Development & Coding", issuer: "University of Michigan", date: "10/2022", year: 2022 },
  { title: "Computer Communications Specialization", issuer: "University of Colorado System", date: "07/2022", year: 2022 },
  { title: "Academic Skills for University Success Specialization", issuer: "The University of Sydney", date: "01/2022", year: 2022 },
];
