import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { Box, Container, Flex, Image, VStack, Heading, Text, Button} from '@chakra-ui/react';
import { Toaster, toaster } from '../components/ui/toaster';
import Navbar from '../login_register_components/Navbar';
import InputField from '../login_register_components/InputField';
import courses from '../data/courses.json'
import logo from '../assets/logo.svg';

const RegisterPage = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        courses: [],
    });

    const [validationErrors, setValidationErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    // Validation Rules
    const validateField = async (name, value) => {
        switch (name) {
            case "username":
                if (!/^[a-zA-Z0-9]{3,15}$/.test(value)) {
                    return "Username must be 3-15 characters long, letters and numbers only";
                }

                try {
                    const response = await axios.post("http://localhost:5000/api/users/check-username", { username: value });

                    if (response.data.exists) {
                        return "Username is already taken";
                    }
                } catch (err) {
                    console.error(err);
                }

                return "";
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Please enter a valid email address";
                }

                try {
                    const response = await axios.post("http://localhost:5000/api/users/check-email", { emailAddress: value });

                    if (response.data.exists) {
                        return "Email is already taken";
                    }
                } catch (err) {
                    console.error(err);
                }

                return "";
            case "password":
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
                    return "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
                }

                return "";
            case "confirmPassword":
                if (value !== formData.password) {
                    return "Passwords do not match";
                }

                return "";
            default:
                return "";
        }
    }

    // Handle input changes
    const handleChange = async (e) => {
        const { name, value } = e.target;

        // Updates form data separately if data to be updated is courses
        if (name === "courses") {
            setFormData((prevData) => ({
                ...prevData,
                courses: value.map((course) => ({ name: course.value })), // Assuming value is the array of selected options
            }));

            return;
        }

        // Update form data
        setFormData({ ...formData, [name]: value }); // Update the form data
        
        // Validate field and update validation errors
        const errorMessage = await validateField(name, value);
        setValidationErrors({ ...validationErrors, [name]: errorMessage });
    };

    // Handle form submission
    const handleSubmit = async () => {
        const { username, email, password, confirmPassword, courses } = formData;

        console.log({
            username,
            emailAddress: email,
            password,
            courses,
        });

        const errors = {
            username: await validateField("username", username),
            email: await validateField("email", email),
            password: await validateField("password", password),
            confirmPassword: await validateField("confirmPassword", confirmPassword),
        }

        setValidationErrors(errors);

        if (Object.values(errors).some(err => err !== "")) {
            return;
        }

        // if (password !== confirmPassword) {
        //     toaster.create({
        //         title: "Passwords do not match",
        //         description: "Please make sure your passwords match.",
        //         duration: 3000,
        //         status: "error",
        //         isClosable: true
        //     });
        //     return;
        // }

        try {
            // Make API call to register user
            const response = await axios.post("http://localhost:5000/api/users", {
                username,
                emailAddress: email,
                password,
                courses,
            });

            // Show success toast
            toaster.create({
                title: "Registration Successful!",
                description: `Welcome, ${response.data.username}! Redirecting back to Login Page ...`,
                status: "success",
                duration: 3000,
                isClosable: true,
                type: "success",
            });

            // Clear form data
            // setFormData({
            //     username: "",
            //     email: "",
            //     password: "",
            //     confirmPassword: "",
            //     courses: [],
            // });

            setTimeout(() => {navigate("/login")}, 2000);
        } catch (err) {
            // Show error toast
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
            toaster.create({
                title: "Registration Failed",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
                type: "error",
                overlap: true,
            });
        }
    }

    return (
        <Box>
            <Toaster />
            <Navbar />
            <Flex
                h="90%"
                maxH="90%"
                align="center"
                justify="center"
                bg="gray.100"
                direction={{ base: "col", lg: "row" }}
            >
                {/* Form Section */}
                <Container
                    flex={{ base: 2 }}
                    p={8}
                    borderRadius="lg"
                    mx="4"
                    h={{ base: "100vh", md: "90%" }}
                >
                    <VStack spacing={4} align="flex-start" px={{ base: 4, lg: 10 }} ml={{ lg: "0" }}>
                        <Heading size={"3xl"} mb={2} textAlign="left" color={"black"} fontWeight={"bold"}>
                            Join StudyLink Today!
                        </Heading>

                        <Text color={"gray.800"} textAlign={"left"} fontSize={"xl"} fontWeight={"medium"} maxW={{ lg: "80%" }}>
                            {/* Stuck on an assignment? Or need someone to motivate you to keep studying? Come study with us! */}
                            Create your account and start connecting with study buddies!
                        </Text>

                        {/* Username Field */}
                        <InputField 
                            label={"Username"}
                            name={"username"}
                            value={formData.username}
                            onChange={handleChange}
                            color={"gray.800"}
                            required
                            width={{ base: "100%", lg: "80%" }}
                        />
                        {validationErrors.username && (
                            <Text color="red.500" fontSize="sm">{validationErrors.username}</Text>
                        )}

                        {/* Email Field */}
                        <InputField 
                            label={"Email"} 
                            name={"email"}
                            value={formData.email}
                            onChange={handleChange}
                            color={"gray.800"} 
                            required 
                            width={{ base: "100%", lg: "80%" }}
                        /> 
                        {validationErrors.email && (
                            <Text color="red.500" fontSize="sm">{validationErrors.email}</Text>
                        )}

                        {/* Password Field */}
                        <InputField 
                            label={"Password"} 
                            name={"password"}
                            type={"password"}
                            value={formData.password}
                            onChange={handleChange}
                            color={"gray.800"} 
                            required 
                            width={{ base: "100%", lg: "80%" }}
                        />
                        {validationErrors.password && (
                            <Text color="red.500" fontSize="sm">{validationErrors.password}</Text>
                        )}

                        {/* Confirm Password Field */}
                        <InputField 
                            label={"Confirm Password"} 
                            name={"confirmPassword"}
                            type={"password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            color={"gray.800"} 
                            required 
                            width={{ base: "100%", lg: "80%" }}
                        />
                        {validationErrors.confirmPassword && (
                            <Text color="red.500" fontSize="sm">{validationErrors.confirmPassword}</Text>
                        )}

                        <Text color="gray.800">Courses</Text>
                        <Select
                            options={courses}
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder="Select courses you are currently enrolled in..."
                            value={formData.courses.map((course) =>
                                courses.find((option) => course.name === option.value)
                            )}
                            onChange={(selectedCourses) =>
                                handleChange({
                                    target: { name: "courses", value: selectedCourses }
                                })
                            }
                            isSearchable={true}
                            styles={{
                                container: (base) => ({ ...base, width: '80%' }),
                                menu: (base) => ({
                                    ...base,
                                    maxHeight: '120px',
                                    overflowY: 'auto',
                                }),
                                menuList: (base) => ({
                                    ...base,
                                    maxHeight: '120px',
                                    overflowY: 'auto',
                                }),
                            }}
                        />
                        
                        <Box width={{ base: "100%", lg: "80%" }} textAlign="center" mt="1em" >
                            <Button variant="solid" bg={'blue.800'} _hover={{ bg: "blue.700" }} width="100%" onClick={handleSubmit}>
                                <Text fontWeight={"bold"} color={"white"}>REGISTER</Text>
                            </Button>
                        </Box>

                        <Text textAlign={"left"} color={'gray.500'} pt={4}>
                            Already have an account? <Text as={Link} to={'/login'} textDecoration="underline">Login</Text>
                        </Text>
                        {/* <GoogleLogin 
                            onSuccess={(credentialResponse) => {
                                const decoded = jwtDecode(credentialResponse.credential);
                                console.log(decoded);
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}

                        /> */}
                    </VStack>
                </Container>

                <Box 
                    display={{ base: "none", md: "flex" }}
                    flex={{ base: 0, md: 3 }} // Image section takes more space on large screens
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.100" // Optional for visual clarity
                >
                    <Image
                        src={logo}
                        alt="Study Illustration"
                        // maxW="90%"
                        objectFit={"contain"}
                        h="90vh"
                        p={4}
                        zIndex={1}
                    />
                </Box>
            </Flex>
        </Box>
    );
}

export default RegisterPage;
