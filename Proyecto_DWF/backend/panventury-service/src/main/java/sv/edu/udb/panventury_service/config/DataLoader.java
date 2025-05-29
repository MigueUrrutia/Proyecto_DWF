package sv.edu.udb.panventury_service.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;
import sv.edu.udb.panventury_service.model.Usuario;
import sv.edu.udb.panventury_service.repository.UsuarioRepository;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Elimina todos los usuarios anteriores
        usuarioRepository.deleteAll();

        // Inserta usuarios de prueba
        usuarioRepository.save(new Usuario(null, "Admin", "admin@pan.com", passwordEncoder.encode("1234"), "ADMINISTRADOR"));
        usuarioRepository.save(new Usuario(null, "Empleado", "empleado@pan.com", passwordEncoder.encode("1234"), "EMPLEADO"));
        usuarioRepository.save(new Usuario(null, "Cliente", "cliente@pan.com", passwordEncoder.encode("1234"), "CLIENTE"));
    }
}
