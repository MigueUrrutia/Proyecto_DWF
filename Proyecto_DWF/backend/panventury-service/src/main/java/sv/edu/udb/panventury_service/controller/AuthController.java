package sv.edu.udb.panventury_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.panventury_service.model.Usuario;
import sv.edu.udb.panventury_service.repository.UsuarioRepository;
import sv.edu.udb.panventury_service.security.JwtUtils;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // ← Habilita CORS desde el frontend
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        System.out.println("Login recibido: " + loginData); // ← Debug para verificar campos

        String correo = loginData.get("correo");
        String contrasena = loginData.get("contrasena");

        Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

        if (usuario == null || !passwordEncoder.matches(contrasena, usuario.getContrasena())) {
            System.out.println("Credenciales incorrectas");
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        String token = jwtUtils.generateToken(usuario.getCorreo(), usuario.getRol());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", usuario);

        return ResponseEntity.ok(response);
    }
}